import { name, version } from "../goosemodModule.json";

let settings = {
  A: true,
  B: false,
  C: true,
};

function updateSetting(setting, value = settings[setting]) {
  try {
    settings[setting] = value;

    switch (setting) {
      case "A":
        // . . .
        break;
      case "B":
        // . . .
        break;
      case "C":
        // . . .
        break;

      default:
        goosemodScope.showToast(`Setting "${setting}" not found.`, {
          type: "error",
        });
        break;
    }
  } catch (error) {
    goosemodScope.logger.debug(name, error);
    goosemodScope.showToast(
      `Failed to set setting "${setting}" to "${value}".`,
      {
        type: "error",
      }
    );
  }
}

function updateSettings() {
  for (const setting in settings) {
    updateSetting(setting);
  }
}

export default {
  goosemodHandlers: {
    onImport: async () => {
      updateSettings();

      goosemodScope.settings.createItem(name, [
        `(v${version})`,
        {
          type: "header",
          text: "Example Settings",
        },
        {
          type: "toggle",
          text: "A",
          onToggle: (value) => updateSetting("A", value),
          isToggled: () => settings.A,
        },
        {
          type: "toggle",
          text: "B",
          onToggle: (value) => updateSetting("B", value),
          isToggled: () => settings.B,
        },
        {
          type: "toggle",
          text: "C",
          onToggle: (value) => updateSetting("C", value),
          isToggled: () => settings.C,
        },
      ]);

      // . . . (This is where most of your code should go, ran on import.)
    },

    onRemove: async () => {
      goosemodScope.settings.removeItem(name);

      //! . . . (Make sure you completely stop and remove your module here!)
    },

    getSettings: () => [settings],
    loadSettings: ([_settings]) => {
      settings = _settings;

      updateSettings();

      // . . . (Anything else you need to happen when loading settings.)
    },
  },
};
