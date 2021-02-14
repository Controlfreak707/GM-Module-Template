import { version, name } from "../goosemodModule.json";

let settings = {
  boolean: true,
  string: "Hello World!",
  integer: 42,
};

function setSetting(setting, value) {
  try {
    settings[setting] = value;

    switch (setting) {
      case "boolean":
        // . . .
        break;
      case "string":
        // . . .
        break;
      case "integer":
        // . . .
        break;

      default:
        goosemodScope.showToast(`Setting "${setting}" not found.`, {
          type: "error",
        });
        break;
    }
  } catch (e) {
    goosemodScope.logger.debug(name, e);
    goosemodScope.showToast(
      `Failed to set setting "${setting}" to "${value}".`,
      {
        type: "error",
      }
    );
  }
}

export default {
  goosemodHandlers: {
    onImport: async () => {
      setSetting("boolean", settings.boolean);
      setSetting("string", settings.string);
      setSetting("integer", settings.integer);

      // . . . (This is where most of your code should go, ran on import.)
    },

    onLoadingFinished: async () =>
      goosemodScope.settings.createItem(name, [
        `(v${version})`,
        {
          type: "header",
          text: "Example Settings",
        },
        {
          type: "toggle",
          text: "Boolean",
          onToggle: (value) => setSetting("boolean", value),
          isToggled: () => settings.boolean,
        },
        // Input fields (strings, integers) aren't yet available in GooseMod...
      ]),

    onRemove: async () => {
      goosemodScope.settings.removeItem(name);

      //! . . . (Make sure you completely stop and remove your module here!)
    },

    getSettings: () => [settings],
    loadSettings: ([_settings]) => {
      settings = _settings;

      setSetting("boolean", settings.boolean);
      setSetting("string", settings.string);
      setSetting("integer", settings.integer);

      // . . . (Anything else you need to happen when loading settings.)
    },
  },
};
