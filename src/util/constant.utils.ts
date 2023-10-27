import { Language } from '../modules/language/language.model';

export const GetDefaultLanguage = async () => {
  const language = await Language.findOne({ isDefault: true })
    .select(['languageCode', 'languageName'])
    .lean();

  return language;
};
