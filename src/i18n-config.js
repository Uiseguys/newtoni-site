const languages = ["en", "ro"];
const catalogs = {
  en: { messages: require("./locale/en/messages.json") },
  ro: { messages: require("./locale/ro/messages.json") }
};

const defaultLanguage = "en";

const startsWith = (str, searchString, position = 0) =>
  str.indexOf(searchString, position) === position;

const prefix = lang => (lang == defaultLanguage ? "/" : "/" + lang);
const deprefix = pathname =>
  startsWith(pathname, "/ro/") ? pathname.substr(4) : pathname;
const langFromPath = pathname => (startsWith(pathname, "/ro/") ? "ro" : "en");

exports.defaultLanguage = defaultLanguage;
exports.languages = languages;
exports.catalogs = catalogs;
exports.prefix = prefix;
exports.deprefix = deprefix;
exports.langFromPath = langFromPath;
