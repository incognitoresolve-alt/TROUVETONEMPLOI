import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { CVData } from "../types";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#1f2933",
    padding: 48,
    lineHeight: 1.5,
  },
  senderBlock: {
    marginBottom: 24,
  },
  senderName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
  },
  senderLine: {
    fontSize: 9.5,
    color: "#3e4c59",
  },
  recipientBlock: {
    marginBottom: 24,
    alignSelf: "flex-end",
    textAlign: "right",
  },
  dateLine: {
    marginBottom: 24,
    textAlign: "right",
    fontSize: 10,
  },
  objet: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 10.5,
    marginBottom: 10,
  },
  signature: {
    marginTop: 32,
    textAlign: "right",
    fontSize: 10.5,
  },
});

export function CoverLetterDocument({ data }: { data: CVData }) {
  const { personal, coverLetter } = data;
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

        <Text style={styles.dateLine}>
          {[coverLetter.ville, coverLetter.date].filter(Boolean).join(", le ")}
        </Text>

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
