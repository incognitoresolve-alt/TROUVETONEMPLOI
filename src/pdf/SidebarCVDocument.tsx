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
  const photoSize = scaledPhotoSize(76, scale);

  return StyleSheet.create({
    page: {
      flexDirection: "row",
      fontFamily: "Helvetica",
      fontSize: f(10),
      color: "#1f2933",
    },
    sidebar: {
      width: "32%",
      backgroundColor: "#1f3a5f",
      color: "#ffffff",
      padding: s(20),
    },
    main: {
      width: "68%",
      padding: s(24),
    },
    photoWrap: {
      width: photoSize,
      height: photoSize,
      borderRadius: photoSize / 2,
      overflow: "hidden",
      marginBottom: s(12),
    },
    photo: {
      width: photoSize,
      height: photoSize,
      objectFit: "cover",
    },
    name: {
      fontSize: f(18),
      fontFamily: "Helvetica-Bold",
      marginBottom: s(2),
    },
    jobTitle: {
      fontSize: f(11),
      marginBottom: s(16),
      color: "#cfe0f5",
    },
    sidebarSectionTitle: {
      fontSize: f(11),
      fontFamily: "Helvetica-Bold",
      marginTop: s(14),
      marginBottom: s(6),
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: "#cfe0f5",
    },
    sidebarLine: {
      fontSize: f(9),
      marginBottom: s(4),
      lineHeight: 1.4,
    },
    mainSectionTitle: {
      fontSize: f(12),
      fontFamily: "Helvetica-Bold",
      color: "#1f3a5f",
      marginTop: s(14),
      marginBottom: s(6),
      textTransform: "uppercase",
      borderBottom: "1 solid #1f3a5f",
      paddingBottom: s(3),
    },
    summary: {
      fontSize: f(9.5),
      lineHeight: 1.5,
    },
    itemBlock: {
      marginBottom: s(10),
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
      color: "#52606d",
    },
    itemSubtitle: {
      fontSize: f(9.5),
      color: "#334455",
      marginBottom: s(3),
    },
    itemDescription: {
      fontSize: f(9),
      lineHeight: 1.4,
      color: "#3e4c59",
    },
  });
}

export function SidebarCVDocument({ data }: { data: CVData }) {
  const { personal, experiences, educations, skills, languages } = data;
  const styles = buildStyles(getLayoutScale(computeDensity(data)));

  const contactLines = buildContactLines(personal);
  const filledSkills = filterFilled(skills, hasSkillContent);
  const filledLanguages = filterFilled(languages, hasLanguageContent);
  const filledExperiences = filterFilled(experiences, hasExperienceContent);
  const filledEducations = filterFilled(educations, hasEducationContent);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          {personal.photoDataUrl ? (
            <View style={styles.photoWrap}>
              <Image src={personal.photoDataUrl} style={styles.photo} />
            </View>
          ) : null}
          <Text style={styles.name}>{personal.fullName || "Votre nom"}</Text>
          <Text style={styles.jobTitle}>{personal.jobTitle}</Text>

          <Text style={styles.sidebarSectionTitle}>Contact</Text>
          {contactLines.map((line) => (
            <Text key={line} style={styles.sidebarLine}>
              {line}
            </Text>
          ))}

          {filledSkills && (
            <>
              <Text style={styles.sidebarSectionTitle}>Compétences</Text>
              {filledSkills.map((s) => (
                <Text key={s.id} style={styles.sidebarLine}>
                  • {s.name}
                </Text>
              ))}
            </>
          )}

          {filledLanguages && (
            <>
              <Text style={styles.sidebarSectionTitle}>Langues</Text>
              {filledLanguages.map((l) => (
                <Text key={l.id} style={styles.sidebarLine}>
                  {l.name}
                  {l.level ? ` — ${l.level}` : ""}
                </Text>
              ))}
            </>
          )}
        </View>

        <View style={styles.main}>
          {personal.summary ? (
            <>
              <Text style={styles.mainSectionTitle}>Profil</Text>
              <Text style={styles.summary}>{personal.summary}</Text>
            </>
          ) : null}

          {filledExperiences && (
            <>
              <Text style={styles.mainSectionTitle}>Expérience professionnelle</Text>
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
              <Text style={styles.mainSectionTitle}>Formation</Text>
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
        </View>
      </Page>
    </Document>
  );
}
