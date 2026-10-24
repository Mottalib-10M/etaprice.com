import type { Locale } from './routes';
const en = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Checked by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Frequently asked questions', relatedCalculators: 'Related pages', sourcesTitle: 'Official sources', writtenBy: 'Written by',
  asOf: 'Official fees', lastUpdated: 'read on', footerValidated: 'Fees read from GOV.UK, Canadian regulations, the US Federal Register, Home Affairs and Immigration New Zealand', footerBrowser: 'Runs in your browser · no sign-up, no email · free',
  footerDisclaimer: 'Independent site published by Radif Partners. It is not a government site and not an agency: it files no application, sells nothing and takes no commission. Fees and rules come from the official texts cited on each page; euro amounts are our conversion at the ECB reference rate. Only the official government site or app decides and takes payment; this site does not replace it, nor is it legal advice.', footerPopular: '', notFound: 'This page does not exist.',
  readMore: 'Read more',
};
const fr: typeof en = {
  updatedOn: 'Mis à jour le', editorialPolicy: 'Politique éditoriale', contactLabel: 'Contact', reviewedBy: 'Vérifié par',
  skipToContent: 'Aller au contenu', mainNav: 'Navigation principale', breadcrumbLabel: 'Fil d’Ariane', breadcrumbHome: 'Accueil', menuOpen: 'Ouvrir le menu',
  faqTitle: 'Questions fréquentes', relatedCalculators: 'Pages liées', sourcesTitle: 'Sources officielles', writtenBy: 'Rédigé par',
  asOf: 'Frais officiels', lastUpdated: 'relus le', footerValidated: 'Frais relus sur GOV.UK, le règlement canadien, le Federal Register, Home Affairs et Immigration New Zealand', footerBrowser: 'Calcul dans votre navigateur · sans inscription ni e-mail · gratuit',
  footerDisclaimer: 'Site indépendant édité par Radif Partners. Ce n’est ni un site gouvernemental ni une agence : aucune demande n’est déposée ici, rien n’est vendu, aucune commission n’est perçue. Les frais et les règles viennent des textes officiels cités sur chaque page ; les montants en euros sont notre conversion au taux de référence de la BCE. Seul le site ou l’application officielle du pays décide et encaisse ; ce site ne remplace pas cette décision.', footerPopular: '', notFound: 'Cette page n’existe pas.',
  readMore: 'Lire la suite',
};
const de: typeof en = {
  updatedOn: 'Aktualisiert am', editorialPolicy: 'Redaktionelle Grundsätze', contactLabel: 'Kontakt', reviewedBy: 'Geprüft von',
  skipToContent: 'Zum Inhalt', mainNav: 'Hauptnavigation', breadcrumbLabel: 'Brotkrumen', breadcrumbHome: 'Startseite', menuOpen: 'Menü öffnen',
  faqTitle: 'Häufige Fragen', relatedCalculators: 'Verwandte Seiten', sourcesTitle: 'Amtliche Quellen', writtenBy: 'Geschrieben von',
  asOf: 'Amtliche Gebühren', lastUpdated: 'gelesen am', footerValidated: 'Gebühren gelesen bei GOV.UK, in der kanadischen Verordnung, im US Federal Register, bei Home Affairs und Immigration New Zealand', footerBrowser: 'Rechnet in Ihrem Browser · keine Anmeldung, keine E-Mail · kostenlos',
  footerDisclaimer: 'Unabhängige Seite von Radif Partners. Keine Behördenseite und keine Agentur: Hier wird kein Antrag gestellt, nichts verkauft und keine Provision kassiert. Gebühren und Regeln stammen aus den amtlichen Texten, die auf jeder Seite genannt sind; Euro-Beträge sind unsere Umrechnung zum Referenzkurs der EZB. Entscheiden und kassieren darf nur die amtliche Seite oder App des Landes; diese Seite ersetzt keine amtliche Auskunft.', footerPopular: '', notFound: 'Diese Seite gibt es nicht.',
  readMore: 'Weiterlesen',
};
const nl: typeof en = {
  updatedOn: 'Bijgewerkt op', editorialPolicy: 'Redactiestatuut', contactLabel: 'Contact', reviewedBy: 'Nagekeken door',
  skipToContent: 'Naar de inhoud', mainNav: 'Hoofdnavigatie', breadcrumbLabel: 'Kruimelpad', breadcrumbHome: 'Home', menuOpen: 'Menu openen',
  faqTitle: 'Veelgestelde vragen', relatedCalculators: 'Verwante pagina’s', sourcesTitle: 'Officiële bronnen', writtenBy: 'Geschreven door',
  asOf: 'Officiële tarieven', lastUpdated: 'gelezen op', footerValidated: 'Tarieven gelezen bij GOV.UK, de Canadese verordening, het Amerikaanse Federal Register, Home Affairs en Immigration New Zealand', footerBrowser: 'Rekent in uw browser · geen registratie, geen e-mail · gratis',
  footerDisclaimer: 'Onafhankelijke site van Radif Partners. Geen overheidssite en geen bureau: hier wordt geen aanvraag ingediend, niets verkocht en geen commissie ontvangen. Tarieven en regels komen uit de officiële teksten die op elke pagina staan; bedragen in euro zijn onze omrekening tegen de referentiekoers van de ECB. Alleen de officiële site of app van het land beslist en int; deze site vervangt geen officieel besluit.', footerPopular: '', notFound: 'Deze pagina bestaat niet.',
  readMore: 'Lees verder',
};
export function t(lang: Locale) { return lang === 'fr' ? fr : lang === 'de' ? de : lang === 'nl' ? nl : en; }
