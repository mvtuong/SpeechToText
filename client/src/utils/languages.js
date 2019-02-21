const languages = [{
  id: 'af-ZA',
  name: 'Afrikaans (Suid-Afrika)'
}, {
  id: 'am-ET',
  name: '\u12a0\u121b\u122d\u129b (\u12a2\u1275\u12ee\u1335\u12eb)'
}, {
  id: 'hy-AM',
  name: '\u0540\u0561\u0575 (\u0540\u0561\u0575\u0561\u057d\u057f\u0561\u0576)'
}, {
  id: 'az-AZ',
  name: 'Az\u0259rbaycan (Az\u0259rbaycan)(Azerbaijan)'
}, {
  id: 'id-ID',
  name: 'Bahasa Indonesia (Indonesia)'
}, {
  id: 'ms-MY',
  name: 'Bahasa Melayu (Malaysia)'
}, {
  id: 'bn-BD',
  name: '\u09ac\u09be\u0982\u09b2\u09be (\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6)'
}, {
  id: 'bn-IN',
  name: '\u09ac\u09be\u0982\u09b2\u09be (\u09ad\u09be\u09b0\u09a4)'
}, {
  id: 'ca-ES',
  name: 'Catal\u00e0 (Espanya)'
}, {
  id: 'cs-CZ',
  name: '\u010ce\u0161tina (\u010cesk\u00e1 republika)'
}, {
  id: 'da-DK',
  name: 'Dansk (Danmark)'
}, {
  id: 'de-DE',
  name: 'Deutsch (Deutschland)'
}, {
  id: 'en-AU',
  name: 'English (Australia)'
}, {
  id: 'en-CA',
  name: 'English (Canada)'
}, {
  id: 'en-GH',
  name: 'English (Ghana)'
}, {
  id: 'en-GB',
  name: 'English (Great Britain)'
}, {
  id: 'en-IN',
  name: 'English (India)'
}, {
  id: 'en-IE',
  name: 'English (Ireland)'
}, {
  id: 'en-KE',
  name: 'English (Kenya)'
}, {
  id: 'en-NZ',
  name: 'English (New Zealand)'
}, {
  id: 'en-NG',
  name: 'English (Nigeria)'
}, {
  id: 'en-PH',
  name: 'English (Philippines)'
}, {
  id: 'en-ZA',
  name: 'English (South Africa)'
}, {
  id: 'en-TZ',
  name: 'English (Tanzania)'
}, {
  id: 'en-US',
  name: 'English (United States)'
}, {
  id: 'es-AR',
  name: 'Espa\u00f1ol (Argentina)'
}, {
  id: 'es-BO',
  name: 'Espa\u00f1ol (Bolivia)'
}, {
  id: 'es-CL',
  name: 'Espa\u00f1ol (Chile)'
}, {
  id: 'es-CO',
  name: 'Espa\u00f1ol (Colombia)'
}, {
  id: 'es-CR',
  name: 'Espa\u00f1ol (Costa Rica)'
}, {
  id: 'es-EC',
  name: 'Espa\u00f1ol (Ecuador)'
}, {
  id: 'es-SV',
  name: 'Espa\u00f1ol (El Salvador)'
}, {
  id: 'es-ES',
  name: 'Espa\u00f1ol (Espa\u00f1a)'
}, {
  id: 'es-US',
  name: 'Espa\u00f1ol (Estados Unidos)'
}, {
  id: 'es-GT',
  name: 'Espa\u00f1ol (Guatemala)'
}, {
  id: 'es-HN',
  name: 'Espa\u00f1ol (Honduras)'
}, {
  id: 'es-MX',
  name: 'Espa\u00f1ol (M\u00e9xico)'
}, {
  id: 'es-NI',
  name: 'Espa\u00f1ol (Nicaragua)'
}, {
  id: 'es-PA',
  name: 'Espa\u00f1ol (Panam\u00e1)'
}, {
  id: 'es-PY',
  name: 'Espa\u00f1ol (Paraguay)'
}, {
  id: 'es-PE',
  name: 'Espa\u00f1ol (Per\u00fa)'
}, {
  id: 'es-PR',
  name: 'Espa\u00f1ol (Puerto Rico)'
}, {
  id: 'es-DO',
  name: 'Espa\u00f1ol (Rep\u00fablica Dominicana)'
}, {
  id: 'es-UY',
  name: 'Espa\u00f1ol (Uruguay)'
}, {
  id: 'es-VE',
  name: 'Espa\u00f1ol (Venezuela)'
}, {
  id: 'eu-ES',
  name: 'Euskara (Espainia)'
}, {
  id: 'fil-PH',
  name: 'Filipino (Pilipinas)'
}, {
  id: 'fr-CA',
  name: 'Fran\u00e7ais (Canada)'
}, {
  id: 'fr-FR',
  name: 'Fran\u00e7ais (France)'
}, {
  id: 'gl-ES',
  name: 'Galego (Espa\u00f1a)'
}, {
  id: 'ka-GE',
  name: '\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8 (\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd)'
}, {
  id: 'gu-IN',
  name: '\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0 (\u0aad\u0abe\u0ab0\u0aa4)'
}, {
  id: 'hr-HR',
  name: 'Hrvatski (Hrvatska)'
}, {
  id: 'zu-Z',
  name: 'IsiZulu (Ningizimu Afrika)'
}, {
  id: 'is-IS',
  name: '\u00cdslenska (\u00cdsland)'
}, {
  id: 'it-IT',
  name: 'Italiano (Italia)'
}, {
  id: 'jv-ID',
  name: 'Jawa (Indonesia)'
}, {
  id: 'kn-IN',
  name: '\u0c95\u0ca8\u0ccd\u0ca8\u0ca1 (\u0cad\u0cbe\u0cb0\u0ca4)'
}, {
  id: 'km-KH',
  name: '\u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c2\u179a (\u1780\u1798\u17d2\u1796\u17bb\u1787\u17b6)'
}, {
  id: 'lo-LA',
  name: '\u0ea5\u0eb2\u0ea7 (\u0ea5\u0eb2\u0ea7)'
}, {
  id: 'lv-LV',
  name: 'Latvie\u0161u (latvie\u0161u)'
}, {
  id: 'lt-LT',
  name: 'Lietuvi\u0173 (Lietuva)'
}, {
  id: 'hu-HU',
  name: 'Magyar (Magyarorsz\u00e1g)'
}, {
  id: 'ml-IN',
  name: '\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02 (\u0d07\u0d28\u0d4d\u0d24\u0d4d\u0d2f)'
}, {
  id: 'mr-IN',
  name: '\u092e\u0930\u093e\u0920\u0940 (\u092d\u093e\u0930\u0924)'
}, {
  id: 'nl-NL',
  name: 'Nederlands (Nederland)'
}, {
  id: 'ne-NP',
  name: '\u0928\u0947\u092a\u093e\u0932\u0940 (\u0928\u0947\u092a\u093e\u0932)'
}, {
  id: 'nb-NO',
  name: 'Norsk bokm\u00e5l (Norge)'
}, {
  id: 'pl-PL',
  name: 'Polski (Polska)'
}, {
  id: 'pt-BR',
  name: 'Portugu\u00eas (Brasil)'
}, {
  id: 'pt-PT',
  name: 'Portugu\u00eas (Portugal)'
}, {
  id: 'ro-RO',
  name: 'Rom\u00e2n\u0103 (Rom\u00e2nia)'
}, {
  id: 'si-LK',
  name: '\u0dc3\u0dd2\u0d82\u0dc4\u0dbd (\u0dc1\u0dca\u0dbb\u0dd3 \u0dbd\u0d82\u0d9a\u0dcf\u0dc0)'
}, {
  id: 'sk-SK',
  name: 'Sloven\u010dina (Slovensko)'
}, {
  id: 'sl-SI',
  name: 'Sloven\u0161\u010dina (Slovenija)'
}, {
  id: 'su-ID',
  name: 'Urang (Indonesia)'
}, {
  id: 'sw-TZ',
  name: 'Swahili (Tanzania)'
}, {
  id: 'sw-KE',
  name: 'Swahili (Kenya)'
}, {
  id: 'fi-FI',
  name: 'Suomi (Suomi)'
}, {
  id: 'sv-SE',
  name: 'Svenska (Sverige)'
}, {
  id: 'ta-IN',
  name: '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd (\u0b87\u0ba8\u0bcd\u0ba4\u0bbf\u0baf\u0bbe)'
}, {
  id: 'ta-SG',
  name: '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd (\u0b9a\u0bbf\u0b99\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0bc2\u0bb0\u0bcd)'
}, {
  id: 'ta-LK',
  name: '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd (\u0b87\u0bb2\u0b99\u0bcd\u0b95\u0bc8)'
}, {
  id: 'ta-MY',
  name: '\u0ba4\u0bae\u0bbf\u0bb4\u0bcd (\u0bae\u0bb2\u0bc7\u0b9a\u0bbf\u0baf\u0bbe)'
}, {
  id: 'te-IN',
  name: '\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41 (\u0c2d\u0c3e\u0c30\u0c24\u0c26\u0c47\u0c36\u0c02)'
}, {
  id: 'vi-VN',
  name: 'Ti\u1ebfng Vi\u1ec7t (Vi\u1ec7t Nam)'
}, {
  id: 'tr-TR',
  name: 'T\u00fcrk\u00e7e (T\u00fcrkiye)'
}, {
  id: 'ur-PK',
  name: '\u0627\u0631\u062f\u0648 (\u067e\u0627\u06a9\u0633\u062a\u0627\u0646)',
  rtl: !0
}, {
  id: 'ur-IN',
  name: '\u0627\u0631\u062f\u0648 (\u0628\u06be\u0627\u0631\u062a)',
  rtl: !0
}, {
  id: 'el-GR',
  name: '\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac (\u0395\u03bb\u03bb\u03ac\u03b4\u03b1)'
}, {
  id: 'bg-BG',
  name: '\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438 (\u0411\u044a\u043b\u0433\u0430\u0440\u0438\u044f)'
}, {
  id: 'ru-RU',
  name: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439 (\u0420\u043e\u0441\u0441\u0438\u044f)'
}, {
  id: 'sr-RS',
  name: '\u0421\u0440\u043f\u0441\u043a\u0438 (\u0421\u0440\u0431\u0438\u0458\u0430)'
}, {
  id: 'uk-UA',
  name: '\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430 (\u0423\u043a\u0440\u0430\u0457\u043d\u0430)'
}, {
  id: 'he-IL',
  name: '\u05e2\u05d1\u05e8\u05d9\u05ea (\u05d9\u05e9\u05e8\u05d0\u05dc)',
  rtl: !0
}, {
  id: 'ar-IL',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0625\u0633\u0631\u0627\u0626\u064a\u0644)',
  rtl: !0
}, {
  id: 'ar-JO',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0627\u0644\u0623\u0631\u062f\u0646)',
  rtl: !0
}, {
  id: 'ar-AE',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a)',
  rtl: !0
}, {
  id: 'ar-BH',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0627\u0644\u0628\u062d\u0631\u064a\u0646)',
  rtl: !0
}, {
  id: 'ar-DZ',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0627\u0644\u062c\u0632\u0627\u0626\u0631)',
  rtl: !0
}, {
  id: 'ar-SA',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629)',
  rtl: !0
}, {
  id: 'ar-IQ',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0627\u0644\u0639\u0631\u0627\u0642)',
  rtl: !0
}, {
  id: 'ar-KW',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0627\u0644\u0643\u0648\u064a\u062a)',
  rtl: !0
}, {
  id: 'ar-MA',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0627\u0644\u0645\u063a\u0631\u0628)',
  rtl: !0
}, {
  id: 'ar-TN',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u062a\u0648\u0646\u0633)',
  rtl: !0
}, {
  id: 'ar-OM',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0639\u064f\u0645\u0627\u0646)',
  rtl: !0
}, {
  id: 'ar-PS',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0641\u0644\u0633\u0637\u064a\u0646)',
  rtl: !0
}, {
  id: 'ar-QA',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0642\u0637\u0631)',
  rtl: !0
}, {
  id: 'ar-LB',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0644\u0628\u0646\u0627\u0646)',
  rtl: !0
}, {
  id: 'ar-EG',
  name: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629 (\u0645\u0635\u0631)',
  rtl: !0
}, {
  id: 'fa-IR',
  name: '\u0641\u0627\u0631\u0633\u06cc (\u0627\u06cc\u0631\u0627\u0646)',
  rtl: !0
}, {
  id: 'hi-IN',
  name: '\u0939\u093f\u0928\u094d\u0926\u0940 (\u092d\u093e\u0930\u0924)'
}, {
  id: 'th-TH',
  name: '\u0e44\u0e17\u0e22 (\u0e1b\u0e23\u0e30\u0e40\u0e17\u0e28\u0e44\u0e17\u0e22)'
}, {
  id: 'ko-KR',
  name: '\ud55c\uad6d\uc5b4 (\ub300\ud55c\ubbfc\uad6d)'
}, {
  id: 'cmn-Hant-TW',
  name: '\u570b\u8a9e (\u53f0\u7063)'
}, {
  id: 'yue-Hant-HK',
  name: '\u5ee3\u6771\u8a71 (\u9999\u6e2f)'
}, {
  id: 'ja-JP',
  name: '\u65e5\u672c\u8a9e\uff08\u65e5\u672c)'
}, {
  id: 'cmn-Hans-HK',
  name: '\u666e\u901a\u8a71 (\u9999\u6e2f)'
}, {
  id: 'cmn-Hans-CN',
  name: '\u666e\u901a\u8bdd (\u4e2d\u56fd\u5927\u9646)'
}];

module.exports = { languages };
