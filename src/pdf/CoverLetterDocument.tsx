import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { CVData } from "../types";
import { computeLetterDensity, fontPx, getLayoutScale, spacePx, type LayoutScale } from "../lib/density";

function buildStyles(scale: LayoutScale) {
  const f = (base: number) => fontPx(base, scale);
  const s = (base: number) => spacePx(base, scale);

  return StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: f(11),
      color: "#1f2933",
      padding: s(48),
      lineHeight: 1.5,
    },
    senderBlock: {
      marginBottom: s(24),
    },
    senderName: {
      fontFamily: "Helvetica-Bold",
      fontSize: f(12),
    },
    senderLine: {
      fontSize: f(9.5),
      color: "#3e4c59",
    },
    recipientBlock: {
      marginBottom: s(24),
      alignSelf: "flex-end",
      textAlign: "right",
    },
    dateLine: {
      marginBottom: s(24),
      textAlign: "right",
      fontSize: f(10),
    },
    objet: {
      fontFamily: "Helvetica-Bold",
      fontSize: f(11),
      marginBottom: s(20),
    },
    paragraph: {
      fontSize: f(10.5),
      marginBottom: s(10),
    },
    signature: {
      marginTop: s(32),
      textAlign: "right",
      fontSize: f(10.5),
    },
  });
}

/** "Lyon, le 18 août 2026" with either part optional — and capitalized when the date leads alone ("Le 18 août 2026"). */
function formatDateLine(ville: string, date: string): string {
  const parts = [ville, date ? `le ${date}` : ""].filter(Boolean);
  const text = parts.join(", ");
  return text ? text[0].toUpperCase() + text.slice(1) : "";
}

export function CoverLetterDocument({ data }: { data: CVData }) {
  const { personal, coverLetter } = data;
  const styles = buildStyles(getLayoutScale(computeLetterDensity(coverLetter.corps)));
  const paragraphs = coverLetter.corps
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.senderBlock}>
          <Text style={styles.senderName}>{personal.fullName}</Text>
          {personal.address ? <Text style={styles.senderLine}>{personal.address}</Text> : null}
          {personal.city ? <Text style={styles.senderLine}>{personal.city}</Text> : null}
          {personal.email ? <Text style={styles.senderLine}>{personal.email}</Text> : null}
          {personal.phone ? <Text style={styles.senderLine}>{personal.phone}</Text> : null}
        </View>

        <View style={styles.recipientBlock}>
          {coverLetter.destinataire ? (
            <Text style={styles.senderLine}>{coverLetter.destinataire}</Text>
          ) : null}
          {coverLetter.entreprise ? (
            <Text style={styles.senderLine}>{coverLetter.entreprise}</Text>
          ) : null}
          {coverLetter.adresseEntreprise ? (
            <Text style={styles.senderLine}>{coverLetter.adresseEntreprise}</Text>
          ) : null}
        </View>

        <Text style={styles.dateLine}>{formatDateLine(coverLetter.ville, coverLetter.date)}</Text>

        {coverLetter.objet ? (
          <Text style={styles.objet}>Objet : {coverLetter.objet}</Text>
        ) : null}

        {paragraphs.map((p, i) => (
          <Text key={i} style={styles.paragraph}>
            {p}
          </Text>
        ))}

        <Text style={styles.signature}>{personal.fullName}</Text>
      </Page>
    </Document>
  );
}
