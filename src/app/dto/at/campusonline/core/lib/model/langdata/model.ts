export interface TranslationDto {
  de?:string;
  en?:string;
  fr?:string;
  it?:string;
}

export interface CoLangDataTypeDto {
  value?:string;
  translations?:TranslationDto;
}

