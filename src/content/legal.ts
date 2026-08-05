import type { Locale } from "./site.config";

type L = Record<Locale, string>;

export type LegalSection = {
  heading: L;
  /** Absätze. Innerhalb eines Absatzes ist kein Markup erlaubt. */
  body?: L[];
  /** Aufzählung unter den Absätzen. */
  list?: L[];
};

export const privacyIntro: L = {
  de: "Der Schutz personenbezogener Daten ist uns wichtig. Diese Erklärung beschreibt, welche Daten beim Besuch dieser Website erhoben werden, zu welchem Zweck das geschieht und welche Rechte Ihnen zustehen.",
  en: "Protecting personal data matters to us. This notice explains which data is collected when you visit this website, why, and what rights you have.",
};

export const privacySections: LegalSection[] = [
  {
    heading: { de: "1. Verantwortlicher", en: "1. Controller" },
    body: [
      {
        de: "Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist die im Impressum genannte Stelle. Die Kontaktdaten finden Sie dort.",
        en: "The controller for data processing on this website within the meaning of the GDPR is the entity named in the legal notice, where you will also find the contact details.",
      },
      {
        de: "Ein Datenschutzbeauftragter ist nicht bestellt, da die gesetzlichen Voraussetzungen nach § 38 BDSG nicht vorliegen. Anfragen zum Datenschutz richten Sie bitte an die im Impressum genannte E-Mail-Adresse.",
        en: "No data protection officer has been appointed, as the statutory thresholds under § 38 BDSG are not met. Please direct data protection enquiries to the email address in the legal notice.",
      },
    ],
  },
  {
    heading: { de: "2. Grundsätze der Verarbeitung", en: "2. Principles of processing" },
    body: [
      {
        de: "Personenbezogene Daten werden nur verarbeitet, soweit dies für eine funktionsfähige Website sowie für die Bearbeitung Ihrer Anfrage erforderlich ist. Eine Verarbeitung erfolgt ausschließlich auf Grundlage von Artikel 6 DSGVO.",
        en: "Personal data is processed only as far as necessary to operate the website and to handle your enquiry. Processing takes place exclusively on the basis of Article 6 GDPR.",
      },
      {
        de: "Daten werden gelöscht, sobald der Zweck der Speicherung entfällt und keine gesetzlichen Aufbewahrungsfristen entgegenstehen.",
        en: "Data is deleted as soon as the purpose for storing it no longer applies and no statutory retention period requires otherwise.",
      },
    ],
  },
  {
    heading: { de: "3. Aufruf der Website und Server-Logfiles", en: "3. Site access and server log files" },
    body: [
      {
        de: "Bei jedem Aufruf übermittelt Ihr Browser technisch notwendige Daten an den Server. Diese werden in Logfiles gespeichert:",
        en: "Each time the site is accessed, your browser transmits technically necessary data to the server. It is stored in log files:",
      },
    ],
    list: [
      { de: "gekürzte IP-Adresse", en: "shortened IP address" },
      { de: "Datum und Uhrzeit des Zugriffs", en: "date and time of access" },
      { de: "aufgerufene Seite und übertragene Datenmenge", en: "page requested and volume of data transferred" },
      { de: "Browsertyp, Browserversion und Betriebssystem", en: "browser type, browser version and operating system" },
      { de: "Meldung über erfolgreichen Abruf oder Fehlercode", en: "success message or error code" },
    ],
  },
  {
    heading: { de: "4. Rechtsgrundlage der Logfiles", en: "4. Legal basis for log files" },
    body: [
      {
        de: "Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe f DSGVO. Das berechtigte Interesse liegt in der technischen Auslieferung der Seite, der Systemsicherheit und der Aufklärung missbräuchlicher Zugriffe. Eine Zusammenführung dieser Daten mit anderen Datenquellen oder eine Auswertung zu Werbezwecken findet nicht statt.",
        en: "The legal basis is Article 6(1)(f) GDPR. The legitimate interest lies in delivering the site, system security and investigating abusive access. This data is not combined with other sources and is not evaluated for advertising.",
      },
      {
        de: "Logfiles werden nach spätestens sieben Tagen gelöscht, sofern kein sicherheitsrelevanter Vorfall eine längere Aufbewahrung erfordert.",
        en: "Log files are deleted after seven days at the latest, unless a security incident requires longer retention.",
      },
    ],
  },
  {
    heading: { de: "5. Hosting", en: "5. Hosting" },
    body: [
      {
        de: "Die Website wird bei einem Dienstleister innerhalb der Europäischen Union gehostet. Der Anbieter verarbeitet die oben genannten Daten ausschließlich in unserem Auftrag und ist vertraglich nach Artikel 28 DSGVO gebunden. Der Name des Anbieters ist im Impressum genannt.",
        en: "The website is hosted by a provider within the European Union. The provider processes the data listed above solely on our behalf and is bound by a contract under Article 28 GDPR. The provider is named in the legal notice.",
      },
    ],
  },
  {
    heading: { de: "6. Kontaktformular, E-Mail und Telefon", en: "6. Contact form, email and phone" },
    body: [
      {
        de: "Wenn Sie uns über das Formular, per E-Mail oder telefonisch kontaktieren, verarbeiten wir die von Ihnen übermittelten Angaben, um Ihre Anfrage zu beantworten. Pflichtfelder sind als solche gekennzeichnet, alle weiteren Angaben sind freiwillig.",
        en: "If you contact us through the form, by email or by phone, we process the details you provide in order to answer your enquiry. Mandatory fields are marked as such, all other details are voluntary.",
      },
      {
        de: "Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe b DSGVO, soweit die Anfrage auf den Abschluss eines Vertrags gerichtet ist, im Übrigen Artikel 6 Absatz 1 Buchstabe a DSGVO auf Grundlage Ihrer Einwilligung. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.",
        en: "The legal basis is Article 6(1)(b) GDPR where the enquiry is aimed at concluding a contract, and otherwise Article 6(1)(a) GDPR on the basis of your consent. Consent given can be withdrawn at any time with effect for the future.",
      },
      {
        de: "Anfragedaten werden gelöscht, sobald der Vorgang abgeschlossen ist und keine handels- oder steuerrechtlichen Aufbewahrungsfristen bestehen. Wird ein Vertrag geschlossen, gelten die gesetzlichen Fristen von sechs bzw. zehn Jahren.",
        en: "Enquiry data is deleted once the matter is closed and no commercial or tax retention period applies. If a contract is concluded, the statutory periods of six or ten years apply.",
      },
    ],
  },
  {
    heading: { de: "7. Keine Cookies, kein Tracking", en: "7. No cookies, no tracking" },
    body: [
      {
        de: "Diese Website speichert keine Cookies und greift nicht auf Informationen in Ihrer Endeinrichtung zu. Eine Einwilligung nach § 25 TDDDG ist deshalb nicht erforderlich, und es wird kein Einwilligungsbanner angezeigt.",
        en: "This website stores no cookies and does not access information on your device. Consent under § 25 TDDDG is therefore not required, and no consent banner is shown.",
      },
      {
        de: "Es kommen keine Analyse-, Reichweitenmess-, Remarketing- oder Social-Media-Dienste zum Einsatz. Es sind keine Zählpixel, keine eingebetteten Videos und keine Kartendienste eingebunden.",
        en: "No analytics, audience measurement, remarketing or social media services are used. There are no tracking pixels, no embedded videos and no map services.",
      },
    ],
  },
  {
    heading: { de: "8. Schriftarten und externe Inhalte", en: "8. Fonts and external content" },
    body: [
      {
        de: "Es werden keine Schriftarten von externen Anbietern nachgeladen. Die Seite verwendet ausschließlich die auf Ihrem Gerät installierten Systemschriften. Sämtliche Bilder, Skripte und Stylesheets werden vom eigenen Server ausgeliefert. Beim Aufruf dieser Website entsteht damit keine Verbindung zu Servern Dritter.",
        en: "No fonts are loaded from external providers. The site uses only the system fonts already installed on your device. All images, scripts and stylesheets are served from our own server. Visiting this website therefore creates no connection to third party servers.",
      },
    ],
  },
  {
    heading: { de: "9. Empfänger der Daten", en: "9. Recipients of the data" },
    body: [
      {
        de: "Eine Weitergabe Ihrer Daten erfolgt nur an den Hostinganbieter als Auftragsverarbeiter sowie an Steuerberatung und Behörden, soweit dies gesetzlich vorgeschrieben ist. Eine Übermittlung in ein Land außerhalb der Europäischen Union findet nicht statt. Ihre Daten werden nicht verkauft und nicht zu Werbezwecken an Dritte gegeben.",
        en: "Your data is passed on only to the hosting provider as a processor, and to tax advisers and authorities where the law requires it. There is no transfer to a country outside the European Union. Your data is never sold and never passed to third parties for advertising.",
      },
    ],
  },
  {
    heading: { de: "10. Ihre Rechte", en: "10. Your rights" },
    body: [
      { de: "Ihnen stehen gegenüber uns folgende Rechte zu:", en: "You have the following rights in relation to us:" },
    ],
    list: [
      { de: "Auskunft über die zu Ihrer Person gespeicherten Daten, Artikel 15 DSGVO", en: "access to the data stored about you, Article 15 GDPR" },
      { de: "Berichtigung unrichtiger Daten, Artikel 16 DSGVO", en: "rectification of inaccurate data, Article 16 GDPR" },
      { de: "Löschung, Artikel 17 DSGVO", en: "erasure, Article 17 GDPR" },
      { de: "Einschränkung der Verarbeitung, Artikel 18 DSGVO", en: "restriction of processing, Article 18 GDPR" },
      { de: "Datenübertragbarkeit, Artikel 20 DSGVO", en: "data portability, Article 20 GDPR" },
      { de: "Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft, Artikel 7 Absatz 3 DSGVO", en: "withdrawal of consent with effect for the future, Article 7(3) GDPR" },
    ],
  },
  {
    heading: { de: "11. Widerspruchsrecht", en: "11. Right to object" },
    body: [
      {
        de: "Sie haben nach Artikel 21 DSGVO das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender Daten Widerspruch einzulegen, soweit die Verarbeitung auf Artikel 6 Absatz 1 Buchstabe f DSGVO beruht. Wir verarbeiten die Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen.",
        en: "Under Article 21 GDPR you have the right, on grounds arising from your particular situation, to object at any time to processing of your data based on Article 6(1)(f) GDPR. We will then stop processing the data unless we can demonstrate compelling legitimate grounds.",
      },
    ],
  },
  {
    heading: { de: "12. Beschwerde bei der Aufsichtsbehörde", en: "12. Complaint to the supervisory authority" },
    body: [
      {
        de: "Unbeschadet anderer Rechtsbehelfe steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts oder des Orts des mutmaßlichen Verstoßes. Für uns zuständig ist:",
        en: "Without prejudice to other remedies, you have the right to lodge a complaint with a data protection supervisory authority, in particular in the member state of your residence or of the alleged infringement. The authority responsible for us is:",
      },
      { de: "{{authority}}", en: "{{authority}}" },
    ],
  },
  {
    heading: { de: "13. Datensicherheit", en: "13. Data security" },
    body: [
      {
        de: "Die Website wird ausschließlich über eine TLS-verschlüsselte Verbindung ausgeliefert. Damit sind die zwischen Ihrem Browser und dem Server übertragenen Inhalte gegen Mitlesen durch Dritte geschützt. Ergänzend setzen wir technische und organisatorische Maßnahmen nach Artikel 32 DSGVO ein.",
        en: "The website is delivered exclusively over a TLS encrypted connection, so content passing between your browser and the server is protected from being read by third parties. We additionally apply technical and organisational measures under Article 32 GDPR.",
      },
    ],
  },
  {
    heading: { de: "14. Stand dieser Erklärung", en: "14. Status of this notice" },
    body: [
      {
        de: "Diese Datenschutzerklärung wird angepasst, sobald sich die Rechtslage oder die Verarbeitung auf dieser Website ändert. Letzte Prüfung: {{reviewed}}.",
        en: "This privacy notice is updated whenever the legal situation or the processing on this website changes. Last reviewed: {{reviewed}}.",
      },
    ],
  },
];

export const termsIntro: L = {
  de: "Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über Dienstleistungen, die zwischen dem im Impressum genannten Unternehmen und dem Auftraggeber geschlossen werden.",
  en: "These general terms apply to every service contract concluded between the company named in the legal notice and the client.",
};

export const termsSections: LegalSection[] = [
  {
    heading: { de: "1. Geltungsbereich", en: "1. Scope" },
    body: [
      {
        de: "Diese Bedingungen gelten in der bei Vertragsschluss gültigen Fassung. Abweichende Bedingungen des Auftraggebers werden nur Vertragsbestandteil, wenn ihnen ausdrücklich in Textform zugestimmt wurde.",
        en: "These terms apply in the version valid at the time the contract is concluded. Differing terms of the client become part of the contract only if expressly agreed in text form.",
      },
      {
        de: "Verbraucher im Sinne dieser Bedingungen ist jede natürliche Person, die den Vertrag zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können.",
        en: "A consumer within these terms is any natural person concluding the contract for purposes that are predominantly outside their trade, business or profession.",
      },
    ],
  },
  {
    heading: { de: "2. Angebot und Vertragsschluss", en: "2. Quotation and conclusion of contract" },
    body: [
      {
        de: "Darstellungen auf dieser Website sind unverbindlich und stellen kein Angebot im Rechtssinne dar. Ein Vertrag kommt erst durch ein schriftliches Angebot und dessen Annahme in Textform zustande.",
        en: "Presentations on this website are non binding and do not constitute a legal offer. A contract is formed only through a written quotation and its acceptance in text form.",
      },
      {
        de: "Angebote beruhen auf den Angaben des Auftraggebers. Ergibt die Begehung einen erheblich abweichenden Aufwand, wird das Angebot vor Ausführung angepasst.",
        en: "Quotations are based on the information supplied by the client. If the site visit reveals a materially different scope, the quotation is adjusted before work begins.",
      },
    ],
  },
  {
    heading: { de: "3. Leistungsumfang und Abgrenzung", en: "3. Scope of services and limits" },
    body: [
      {
        de: "Der Umfang der Leistung ergibt sich aus dem Angebot und dem darin vereinbarten Leistungsverzeichnis. Nicht beauftragte Arbeiten werden nicht ausgeführt.",
        en: "The scope of work follows from the quotation and the schedule of services agreed within it. Work that has not been ordered is not carried out.",
      },
      {
        de: "Arbeiten, die nach der Handwerksordnung einer Eintragung in die Handwerksrolle für ein zulassungspflichtiges Handwerk bedürfen, insbesondere Maler- und Lackierarbeiten, Elektroinstallationen, Sanitär- und Heizungsarbeiten, Fliesenarbeiten sowie Tischlerarbeiten, sind nicht Gegenstand des Vertrags. Solche Leistungen werden auf Wunsch an eingetragene Fachbetriebe vermittelt und koordiniert. Der Vertrag über diese Arbeiten kommt unmittelbar zwischen dem Auftraggeber und dem Fachbetrieb zustande.",
        en: "Work that under German trade law requires registration for a licensed craft, in particular painting and varnishing, electrical installation, plumbing and heating, tiling and joinery, is not part of this contract. On request such work is referred to registered specialist firms and coordinated by us. The contract for that work is concluded directly between the client and the specialist firm.",
      },
    ],
  },
  {
    heading: { de: "4. Mitwirkung des Auftraggebers", en: "4. Client cooperation" },
    body: [
      {
        de: "Der Auftraggeber stellt zum vereinbarten Termin den Zugang zum Objekt sicher und ermöglicht die Nutzung von Wasser und Strom, soweit dies zur Leistungserbringung erforderlich ist.",
        en: "The client ensures access to the property at the agreed time and provides use of water and electricity where required to carry out the work.",
      },
      {
        de: "Kann eine Leistung aus Gründen, die der Auftraggeber zu vertreten hat, nicht erbracht werden, kann die vereinbarte Vergütung für den entfallenen Termin berechnet werden. Ersparte Aufwendungen werden angerechnet.",
        en: "If work cannot be carried out for reasons within the client's responsibility, the agreed fee for that appointment may be charged, less any expenses saved.",
      },
    ],
  },
  {
    heading: { de: "5. Schlüssel und Zugangsmittel", en: "5. Keys and access" },
    body: [
      {
        de: "Übergebene Schlüssel und Zugangsmittel werden gegen Quittung entgegengenommen, gesichert aufbewahrt und ausschließlich zur Erfüllung des Vertrags verwendet. Bei Vertragsende werden sie unverzüglich zurückgegeben.",
        en: "Keys and access devices handed over are receipted, kept secure and used solely to perform the contract. They are returned without delay when the contract ends.",
      },
    ],
  },
  {
    heading: { de: "6. Termine und Ausführung", en: "6. Appointments and performance" },
    body: [
      {
        de: "Termine werden verbindlich vereinbart. Bei höherer Gewalt, extremen Witterungsereignissen oder unvorhersehbarem Personalausfall verschiebt sich die Leistungszeit angemessen. Der Auftraggeber wird unverzüglich informiert.",
        en: "Appointments are binding. In cases of force majeure, extreme weather or unforeseeable staff absence the performance date shifts by a reasonable period. The client is informed without delay.",
      },
      {
        de: "Die Leistung wird durch eigenes Personal erbracht. Der Einsatz von Nachunternehmern ist zulässig, die Verantwortung gegenüber dem Auftraggeber bleibt davon unberührt.",
        en: "Work is carried out by our own staff. Subcontractors may be used, which does not affect our responsibility towards the client.",
      },
    ],
  },
  {
    heading: { de: "7. Preise und Zahlung", en: "7. Prices and payment" },
    body: [
      {
        de: "Preise gegenüber Verbrauchern verstehen sich als Endpreise einschließlich der gesetzlichen Umsatzsteuer. Preise gegenüber Unternehmern verstehen sich netto zuzüglich Umsatzsteuer in gesetzlicher Höhe.",
        en: "Prices quoted to consumers are final prices including statutory VAT. Prices quoted to businesses are net and subject to VAT at the statutory rate.",
      },
      {
        de: "Rechnungen sind innerhalb von vierzehn Tagen nach Zugang ohne Abzug zur Zahlung fällig. Die Zahlung erfolgt ausschließlich durch Überweisung auf das in der Rechnung genannte Konto. Barzahlungen werden nicht angenommen. Arbeitskosten und Materialkosten werden getrennt ausgewiesen, damit Verbraucher die Steuerermäßigung nach § 35a EStG in Anspruch nehmen können.",
        en: "Invoices fall due for payment without deduction within fourteen days of receipt. Payment is made solely by bank transfer to the account stated on the invoice. Cash is not accepted. Labour and material costs are shown separately so that consumers can claim the tax reduction under § 35a of the German Income Tax Act.",
      },
    ],
  },
  {
    heading: { de: "8. Mängel", en: "8. Defects" },
    body: [
      {
        de: "Der Auftraggeber zeigt erkennbare Mängel innerhalb von sieben Tagen nach Ausführung in Textform an. Innerhalb der gesetzlichen Verjährungsfristen besteht Anspruch auf Nacherfüllung. Schlägt die Nacherfüllung zweimal fehl, bestehen die gesetzlichen Rechte auf Minderung oder Rücktritt.",
        en: "The client reports apparent defects in text form within seven days of performance. Within the statutory limitation periods there is a right to remedial performance. If remedial performance fails twice, the statutory rights to reduce the price or withdraw apply.",
      },
      {
        de: "Für Verbraucher gelten ausschließlich die gesetzlichen Mängelrechte ohne Einschränkung.",
        en: "For consumers the statutory rights in respect of defects apply in full and without restriction.",
      },
    ],
  },
  {
    heading: { de: "9. Haftung", en: "9. Liability" },
    body: [
      {
        de: "Die Haftung ist unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei der Verletzung von Leben, Körper oder Gesundheit sowie in den Fällen des Produkthaftungsgesetzes und einer übernommenen Garantie.",
        en: "Liability is unlimited in cases of intent and gross negligence, for injury to life, body or health, and in cases under the German Product Liability Act or an assumed guarantee.",
      },
      {
        de: "Bei einfacher Fahrlässigkeit wird nur für die Verletzung wesentlicher Vertragspflichten gehaftet, also solcher Pflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Auftraggeber regelmäßig vertrauen darf. In diesem Fall ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.",
        en: "In cases of ordinary negligence liability arises only for breach of material contractual obligations, that is obligations whose fulfilment makes proper performance of the contract possible in the first place and on whose observance the client may regularly rely. In that case liability is limited to the typical, foreseeable damage.",
      },
      {
        de: "Eine weitergehende Haftung besteht nicht. Die Regelungen dieses Abschnitts gelten auch zugunsten der Mitarbeitenden und Erfüllungsgehilfen.",
        en: "No further liability arises. This section also applies for the benefit of our staff and vicarious agents.",
      },
    ],
  },
  {
    heading: { de: "10. Winterdienst", en: "10. Winter service" },
    body: [
      {
        de: "Bei beauftragtem Winterdienst geht die Räum- und Streupflicht im vereinbarten Umfang und innerhalb der vereinbarten Zeiten auf uns über. Umfang, Flächen und Zeitfenster werden im Angebot festgelegt. Außerhalb dieser Zeiten und außerhalb der bezeichneten Flächen verbleibt die Verkehrssicherungspflicht beim Auftraggeber.",
        en: "Where winter service is ordered, the duty to clear and grit passes to us to the agreed extent and within the agreed hours. Scope, areas and time windows are set out in the quotation. Outside those hours and areas the duty to keep the property safe remains with the client.",
      },
      {
        de: "Bei anhaltendem Schneefall oder überfrierender Nässe wird im Rahmen des Zumutbaren mehrfach geräumt. Ein lückenlos eis- und schneefreier Zustand kann nicht geschuldet werden. Jeder Einsatz wird protokolliert.",
        en: "During continuous snowfall or freezing rain we clear repeatedly as far as is reasonable. A permanently ice free and snow free surface cannot be owed. Every visit is logged.",
      },
    ],
  },
  {
    heading: { de: "11. Laufzeit und Kündigung", en: "11. Term and termination" },
    body: [
      {
        de: "Dauerschuldverhältnisse werden auf unbestimmte Zeit geschlossen und können von beiden Seiten mit einer Frist von vier Wochen zum Monatsende in Textform gekündigt werden, sofern im Vertrag nichts anderes vereinbart ist. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.",
        en: "Continuing obligations are concluded for an indefinite period and may be terminated by either side in text form with four weeks' notice to the end of a month, unless the contract provides otherwise. The right to terminate for good cause remains unaffected.",
      },
    ],
  },
  {
    heading: { de: "12. Datenschutz", en: "12. Data protection" },
    body: [
      {
        de: "Personenbezogene Daten werden ausschließlich zur Durchführung des Vertrags verarbeitet. Einzelheiten regelt die Datenschutzerklärung.",
        en: "Personal data is processed solely to perform the contract. Details are set out in the privacy notice.",
      },
    ],
  },
  {
    heading: { de: "13. Schlussbestimmungen", en: "13. Final provisions" },
    body: [
      {
        de: "Es gilt das Recht der Bundesrepublik Deutschland. Bei Verbrauchern gilt diese Rechtswahl nur, soweit dadurch der Schutz zwingender Vorschriften des Staates des gewöhnlichen Aufenthalts nicht entzogen wird.",
        en: "German law applies. For consumers this choice of law applies only insofar as it does not remove the protection of mandatory provisions of the state of their habitual residence.",
      },
      {
        de: "Ist der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist Gerichtsstand der Sitz des Unternehmens.",
        en: "If the client is a merchant, a legal entity under public law or a special fund under public law, the place of jurisdiction is our registered office.",
      },
      {
        de: "Sollte eine Bestimmung unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.",
        en: "Should any provision be invalid, the validity of the remaining provisions is unaffected.",
      },
    ],
  },
];

export const withdrawalIntro: L = {
  de: "Verbrauchern steht ein Widerrufsrecht zu, wenn der Vertrag ausschließlich über Fernkommunikationsmittel oder außerhalb von Geschäftsräumen geschlossen wurde.",
  en: "Consumers have a right of withdrawal where the contract was concluded exclusively by means of distance communication or away from business premises.",
};

export const withdrawalSections: LegalSection[] = [
  {
    heading: { de: "Widerrufsrecht", en: "Right of withdrawal" },
    body: [
      {
        de: "Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.",
        en: "You have the right to withdraw from this contract within fourteen days without giving any reason. The withdrawal period is fourteen days from the day the contract was concluded.",
      },
      {
        de: "Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung, etwa per Post oder E-Mail an die im Impressum genannten Kontaktdaten, über Ihren Entschluss informieren. Sie können dafür das untenstehende Muster verwenden, das aber nicht vorgeschrieben ist. Zur Wahrung der Frist genügt die rechtzeitige Absendung.",
        en: "To exercise this right you must inform us of your decision by a clear statement, for example by post or email to the contact details in the legal notice. You may use the model form below, though this is not obligatory. Sending the notification before the period expires is sufficient.",
      },
    ],
  },
  {
    heading: { de: "Folgen des Widerrufs", en: "Effects of withdrawal" },
    body: [
      {
        de: "Wenn Sie diesen Vertrag widerrufen, erstatten wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist. Für die Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie eingesetzt haben, sofern nichts anderes vereinbart wurde. Entgelte werden Ihnen dafür nicht berechnet.",
        en: "If you withdraw from this contract we will reimburse all payments received from you without undue delay and no later than fourteen days from the day we receive your notice of withdrawal. We use the same means of payment you used, unless otherwise agreed, and you incur no fees for this.",
      },
    ],
  },
  {
    heading: { de: "Vorzeitiger Beginn der Leistung", en: "Starting work before the period ends" },
    body: [
      {
        de: "Wünschen Sie, dass die Leistung bereits während der Widerrufsfrist beginnt, benötigen wir dafür Ihre ausdrückliche Aufforderung in Textform. In diesem Fall schulden Sie im Fall des Widerrufs einen angemessenen Betrag für die bis dahin erbrachte Leistung. Ist die Leistung auf Ihr ausdrückliches Verlangen vollständig erbracht worden, bevor Sie den Widerruf erklärt haben, erlischt das Widerrufsrecht.",
        en: "If you want work to start during the withdrawal period, we need your express request in text form. In that case, should you withdraw, you owe a reasonable amount for the work performed up to that point. If the work has been completed in full at your express request before you withdraw, the right of withdrawal expires.",
      },
    ],
  },
  {
    heading: { de: "Muster-Widerrufsformular", en: "Model withdrawal form" },
    body: [
      {
        de: "An {{legalName}}, {{address}}, {{email}}: Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung. Bestellt am oder Vertrag geschlossen am. Name des Verbrauchers. Anschrift des Verbrauchers. Unterschrift des Verbrauchers, nur bei Mitteilung auf Papier. Datum.",
        en: "To {{legalName}}, {{address}}, {{email}}: I hereby withdraw from the contract concluded by me for the provision of the following service. Ordered on or contract concluded on. Name of consumer. Address of consumer. Signature of consumer, only if this form is notified on paper. Date.",
      },
    ],
  },
];

export const legalLabels = {
  impressumTitle: { de: "Impressum", en: "Legal notice" },
  impressumSub: { de: "Angaben gemäß § 5 DDG", en: "Information pursuant to § 5 DDG" },
  privacyTitle: { de: "Datenschutzerklärung", en: "Privacy policy" },
  termsTitle: { de: "Allgemeine Geschäftsbedingungen", en: "General terms and conditions" },
  withdrawalTitle: { de: "Widerrufsbelehrung für Verbraucher", en: "Withdrawal notice for consumers" },
  provider: { de: "Diensteanbieter", en: "Service provider" },
  represented: { de: "Vertreten durch", en: "Represented by" },
  register: { de: "Registereintrag", en: "Register entry" },
  contactLabel: { de: "Kontakt", en: "Contact" },
  vat: { de: "Umsatzsteuer-Identifikationsnummer", en: "VAT identification number" },
  vatNote: {
    de: "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und daher auch keine Umsatzsteuer-Identifikationsnummer geführt.",
    en: "Under § 19 of the German VAT Act no VAT is charged, and accordingly no VAT identification number is held.",
  },
  chamberLabel: { de: "Zuständige Kammer", en: "Competent chamber" },
  professionLabel: { de: "Berufsbezeichnung", en: "Professional title" },
  professionRules: { de: "Berufsrechtliche Regelungen", en: "Professional regulations" },
  professionRulesValue: {
    de: "Handwerksordnung (HwO), einsehbar unter gesetze-im-internet.de/hwo",
    en: "German Trade and Crafts Code (HwO), available at gesetze-im-internet.de/hwo",
  },
  disputeLabel: { de: "Verbraucherstreitbeilegung", en: "Consumer dispute resolution" },
  disputeNo: {
    de: "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).",
    en: "We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration body (§ 36 VSBG).",
  },
  liabilityContentLabel: { de: "Haftung für Inhalte", en: "Liability for content" },
  liabilityContent: {
    de: "Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
    en: "As a service provider we are responsible for our own content on these pages under general law. We are not obliged, however, to monitor transmitted or stored third party information or to investigate circumstances that indicate unlawful activity.",
  },
  liabilityLinksLabel: { de: "Haftung für Links", en: "Liability for links" },
  liabilityLinks: {
    de: "Diese Seite enthält Verweise auf Gesetzestexte. Für die Inhalte verlinkter externer Seiten ist stets deren Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.",
    en: "This site links to legal texts. The provider of any linked external page is always responsible for its content. No infringements were apparent at the time the links were set.",
  },
  copyrightLabel: { de: "Urheberrecht", en: "Copyright" },
  copyright: {
    de: "Die auf dieser Website erstellten Inhalte unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung.",
    en: "Content created on this website is subject to German copyright law. Reproduction, adaptation and distribution beyond the limits of copyright require written consent.",
  },
  hostingLabel: { de: "Hosting", en: "Hosting" },
  bindingVersion: {
    de: "",
    en: "This is a translation for convenience. In case of doubt the German version of this text prevails.",
  },
  lastReviewedLabel: { de: "Stand", en: "Last reviewed" },
} satisfies Record<string, L>;
