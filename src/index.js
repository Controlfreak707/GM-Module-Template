import { version } from "../goosemodModule.json";

let settings = {
  boolean: true,
  string: "Hello World!",
  integer: 42,
};

function setSetting(setting, value) {
  try {
    switch (setting) {
      case "boolean":
        settings.boolean = value;
        // . . .
        break;
      case "string":
        settings.string = value;
        // . . .
        break;
      case "integer":
        settings.integer = value;
        // . . .
        break;

      default:
        goosemodScope.showToast(`Setting "${setting}" not found.`, {
          type: "error",
        });
        break;
    }
  } catch (e) {
    goosemodScope.logger.debug("Module Template", e);
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
      goosemodScope.settings.createItem("Module Template", [
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
      goosemodScope.settings.removeItem("Module Template");

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
