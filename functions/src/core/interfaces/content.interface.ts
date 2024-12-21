export interface ITextContent {
  ua: string;
  de: string;
}

export interface IPhoneContact {
  name: ITextContent;
  phoneNumber: string;
}

export interface IBanner {
  message: ITextContent;
  link: ITextContent;
  data?: Record<string, unknown>;
}

export interface ISocialLink {
  link: string;
  title: string;
}

export interface IContent {
  id: string;
  phoneContacts: IPhoneContact[];
  socialLinks: ISocialLink[];
  email: string;
  iban: string;
  headerBanner?: IBanner;
  footerBanner?: IBanner;
}
