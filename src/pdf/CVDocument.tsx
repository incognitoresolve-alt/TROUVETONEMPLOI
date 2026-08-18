import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { CVData } from "../types";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1f2933",
  },
  sidebar: {
    width: "32%",
    backgroundColor: "#1f3a5f",
    color: "#ffffff",
    padding: 20,
  },
  main: {
    width: "68%",
    padding: 24,
  },
  name: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    marginBottom: 16,
    color: "#cfe0f5",
  },
  sidebarSectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginTop: 14,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#cfe0f5",
  },
  sidebarLine: {
    fontSize: 9,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  mainSectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#1f3a5f",
    marginTop: 14,
    marginBottom: 6,
    textTransform: "uppercase",
    borderBottom: "1 solid #1f3a5f",
    paddingBottom: 3,
  },
  summary: {
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  itemBlock: {
    marginBottom: 10,
  },
  itemTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  itemDates: {
    fontSize: 9,
    color: "#52606d",
  },
  itemSubtitle: {
    fontSize: 9.5,
    color: "#334455",
    marginBottom: 3,
  },
  itemDescription: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#3e4c59",
  },
});

function formatPeriod(debut: string, fin: string, enCours?: boolean) {
  const end = enCours ? "Aujourd'hui" : fin;
  if (!debut && !end) return "";
  return `${debut || "?"} — ${end || "?"}`;
}

export function CVDocument({ data }: { data: CVData }) {
  const { personal, experiences, educations, skills, languages } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <Text style={styles.name}>{personal.fullName || "Votre nom"}</Text>
          <Text style={styles.jobTitle}>{personal.jobTitle}</Text>

          <Text style={styles.sidebarSectionTitle}>Contact</Text>
          {personal.email ? <Text style={styles.sidebarLine}>{personal.email}</Text> : null}
          {personal.phone ? <Text style={styles.sidebarLine}>{personal.phone}</Text> : null}
          {(personal.address || personal.city) ? (
            <Text style={styles.sidebarLine}>
              {[personal.address, personal.city].filter(Boolean).join(", ")}
            </Text>
          ) : null}
          {personal.linkedin ? <Text style={styles.sidebarLine}>{personal.linkedin}</Text> : null}
          {personal.website ? <Text style={styles.sidebarLine}>{personal.website}</Text> : null}

          {skills.some((s) => s.name.trim()) && (
            <>
              <Text style={styles.sidebarSectionTitle}>Compétences</Text>
              {skills
                .filter((s) => s.name.trim())
                .map((s) => (
                  <Text key={s.id} style={styles.sidebarLine}>
                    • {s.name}
                  </Text>
                ))}
            </>
          )}

          {languages.some((l) => l.name.trim()) && (
            <>
              <Text style={styles.sidebarSectionTitle}>Langues</Text>
              {languages
                .filter((l) => l.name.trim())
                .map((l) => (
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

          {experiences.some((e) => e.poste.trim() || e.entreprise.trim()) && (
            <>
              <Text style={styles.mainSectionTitle}>Expérience professionnelle</Text>
              {experiences
                .filter((e) => e.poste.trim() || e.entreprise.trim())
                .map((e) => (
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

          {educations.some((ed) => ed.diplome.trim() || ed.etablissement.trim()) && (
            <>
              <Text style={styles.mainSectionTitle}>Formation</Text>
              {educations
                .filter((ed) => ed.diplome.trim() || ed.etablissement.trim())
                .map((ed) => (
                  <View key={ed.id} style={styles.itemBlock}>
                    <View style={styles.itemTitleRow}>
                      <Text style={styles.itemTitle}>{ed.diplome}</Text>
                      <Text style={styles.itemDates}>
                        {formatPeriod(ed.dateDebut, ed.dateFin)}
                      </Text>
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
