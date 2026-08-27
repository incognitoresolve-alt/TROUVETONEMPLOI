import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import type { CVData } from "../types";
import { computeDensity, fontPx, getLayoutScale, spacePx, type LayoutScale } from "../lib/density";
import {
  buildContactLines,
  filterFilled,
  formatPeriod,
  hasEducationContent,
  hasExperienceContent,
  hasLanguageContent,
  hasSkillContent,
  scaledPhotoSize,
} from "../lib/pdfContent";

function buildStyles(scale: LayoutScale) {
  const f = (base: number) => fontPx(base, scale);
  const s = (base: number) => spacePx(base, scale);
  const photoSize = scaledPhotoSize(60, scale, 0.85, 1.25);

  return StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: f(10),
      color: "#1a1a1a",
      padding: s(40),
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: s(16),
    },
    photo: {
      width: photoSize,
      height: photoSize,
      borderRadius: 4,
      objectFit: "cover",
    },
    name: {
      fontSize: f(20),
      fontFamily: "Helvetica-Bold",
      marginBottom: s(2),
    },
    jobTitle: {
      fontSize: f(11),
      color: "#4a4a4a",
      marginBottom: s(6),
    },
    contactLine: {
      fontSize: f(9),
      color: "#4a4a4a",
    },
    sectionTitle: {
      fontSize: f(10.5),
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      letterSpacing: 0.8,
      borderBottom: "1 solid #1a1a1a",
      paddingBottom: s(3),
      marginTop: s(14),
      marginBottom: s(8),
    },
    summary: {
      fontSize: f(9.5),
      lineHeight: 1.5,
    },
    itemBlock: {
      marginBottom: s(9),
    },
    itemTitleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    itemTitle: {
      fontSize: f(10),
      fontFamily: "Helvetica-Bold",
    },
    itemDates: {
      fontSize: f(9),
      color: "#4a4a4a",
    },
    itemSubtitle: {
      fontSize: f(9.5),
      color: "#333333",
      marginBottom: s(2),
    },
    itemDescription: {
      fontSize: f(9),
      lineHeight: 1.4,
      color: "#333333",
    },
    inlineList: {
      fontSize: f(9.5),
      lineHeight: 1.6,
    },
  });
}

export function ClassicCVDocument({ data }: { data: CVData }) {
  const { personal, experiences, educations, skills, languages } = data;
  const styles = buildStyles(getLayoutScale(computeDensity(data)));

  const contactLine = buildContactLines(personal).join("  •  ");
  const filledSkills = filterFilled(skills, hasSkillContent);
  const filledLanguages = filterFilled(languages, hasLanguageContent);
  const filledExperiences = filterFilled(experiences, hasExperienceContent);
  const filledEducations = filterFilled(educations, hasEducationContent);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.name}>{personal.fullName || "Votre nom"}</Text>
            <Text style={styles.jobTitle}>{personal.jobTitle}</Text>
            <Text style={styles.contactLine}>{contactLine}</Text>
          </View>
          {personal.photoDataUrl ? <Image src={personal.photoDataUrl} style={styles.photo} /> : null}
        </View>

        {personal.summary ? (
          <>
            <Text style={styles.sectionTitle}>Profil</Text>
            <Text style={styles.summary}>{personal.summary}</Text>
          </>
        ) : null}

        {filledExperiences && (
          <>
            <Text style={styles.sectionTitle}>Expérience professionnelle</Text>
            {filledExperiences.map((e) => (
              <View key={e.id} style={styles.itemBlock}>
                <View style={styles.itemTitleRow}>
                  <Text style={styles.itemTitle}>{e.poste}</Text>
                  <Text style={styles.itemDates}>
                    {formatPeriod(e.dateDebut, e.dateFin, e.enCours)}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>
                  {[e.entreprise, e.lieu].filter(Boolean).join(" — ")}
                </Text>
                {e.description ? (
                  <Text style={styles.itemDescription}>{e.description}</Text>
                ) : null}
              </View>
            ))}
          </>
        )}

        {filledEducations && (
          <>
            <Text style={styles.sectionTitle}>Formation</Text>
            {filledEducations.map((ed) => (
              <View key={ed.id} style={styles.itemBlock}>
                <View style={styles.itemTitleRow}>
                  <Text style={styles.itemTitle}>{ed.diplome}</Text>
                  <Text style={styles.itemDates}>{formatPeriod(ed.dateDebut, ed.dateFin)}</Text>
                </View>
                <Text style={styles.itemSubtitle}>
                  {[ed.etablissement, ed.lieu].filter(Boolean).join(" — ")}
                </Text>
                {ed.description ? (
                  <Text style={styles.itemDescription}>{ed.description}</Text>
                ) : null}
              </View>
            ))}
          </>
        )}

        {filledSkills && (
          <>
            <Text style={styles.sectionTitle}>Compétences</Text>
            <Text style={styles.inlineList}>{filledSkills.map((s) => s.name).join("   •   ")}</Text>
          </>
        )}

        {filledLanguages && (
          <>
            <Text style={styles.sectionTitle}>Langues</Text>
            <Text style={styles.inlineList}>
              {filledLanguages
                .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
                .join("   •   ")}
            </Text>
          </>
        )}
      </Page>
    </Document>
  );
}
