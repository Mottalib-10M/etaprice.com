/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://eta-travel-authorization.example";
export const SITE_NAMES: Record<string, string> = {"en": "ETA Price", "fr": "ETA Price", "de": "ETA Price", "nl": "ETA Price"};
export const LANG_TAGS: Record<string, string> = {"en": "en", "fr": "fr-FR", "de": "de-DE", "nl": "nl-NL"};
export const OG_LOCALES: Record<string, string> = {"en": "en_US", "fr": "fr_FR", "de": "de_DE", "nl": "nl_NL"};
export const LOCALE_TAG = 'en-US';
export const LOCALE_BY_LANG: Record<string, string> = { en: 'en-US', fr: 'fr-FR', de: 'de-DE', nl: 'nl-NL' };
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-24';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"en": "Publisher of calculators on the official cost of travel authorisations (UK ETA, Canada eTA, Australia ETA and eVisitor, NZeTA, ESTA)", "fr": "Éditeur de calculateurs sur le prix officiel des autorisations de voyage (ETA britannique, AVE canadienne, ETA et eVisitor australiens, NZeTA, ESTA)", "de": "Herausgeber von Rechnern zu den amtlichen Gebühren elektronischer Einreisegenehmigungen (ETA Großbritannien, eTA Kanada, ETA und eVisitor Australien, NZeTA, ESTA)", "nl": "Uitgever van rekenhulpen over de officiële prijs van reisvergunningen (ETA Verenigd Koninkrijk, eTA Canada, ETA en eVisitor Australië, NZeTA, ESTA)"};
export const AUTHOR_DESC: Record<string, string> = {"en": "Radif Partners reads the fee rules published by the UK Home Office, the Canadian regulations, the US Federal Register, Australia's Department of Home Affairs and Immigration New Zealand, and turns them into the exact official price for each traveller, with the only official place to apply. It is not an agency and files no application.", "fr": "Radif Partners relit les barèmes publiés par le Home Office britannique, le règlement canadien, le Federal Register américain, le ministère australien de l'Intérieur et Immigration New Zealand, et en tire le prix officiel exact pour chaque voyageur, avec la seule adresse officielle où faire la demande. Ce n'est pas une agence : aucune demande n'est déposée ici.", "de": "Radif Partners liest die Gebührenregeln des britischen Home Office, die kanadische Verordnung, das US-amerikanische Federal Register, das australische Innenministerium und Immigration New Zealand und rechnet daraus den genauen amtlichen Preis pro Reisendem, mit der einzigen offiziellen Antragsadresse. Keine Agentur: Hier wird kein Antrag gestellt.", "nl": "Radif Partners leest de tarieven van het Britse Home Office, de Canadese regelgeving, het Amerikaanse Federal Register, het Australische ministerie van Binnenlandse Zaken en Immigration New Zealand, en berekent daaruit de exacte officiële prijs per reiziger, met het enige officiële adres om aan te vragen. Geen bureau: hier wordt geen aanvraag ingediend."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"en": ["UK Electronic Travel Authorisation fee", "Canada electronic travel authorization (eTA)", "Australian ETA and eVisitor", "New Zealand NZeTA and visitor levy", "ESTA fee and Visa Waiver Program"], "fr": ["Prix de l'ETA britannique", "Autorisation de voyage électronique du Canada (AVE)", "ETA et eVisitor australiens", "NZeTA et taxe touristique néo-zélandaise", "ESTA et programme d'exemption de visa"], "de": ["Gebühr der britischen ETA", "Kanadische eTA", "Australische ETA und eVisitor", "NZeTA und Touristenabgabe IVL", "ESTA-Gebühr und Visa Waiver Program"], "nl": ["Prijs van de Britse ETA", "Canadese eTA", "Australische ETA en eVisitor", "NZeTA en toeristenheffing IVL", "ESTA-kosten en Visa Waiver Program"]};
export const CONTACT_EMAIL = "contact@eta-travel-authorization.example";
export const THEME_COLOR = '#1D4E89';
export const LOGO_SYMBOL = 'ETA';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = '2cd13e81b37f6e2011466175e6fb491c';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',
  legalForm: '',  // vide : publication à titre personnel, pas de société
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "TVA / VAT / USt-IdNr. / btw",
  vatNumber: '',
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
