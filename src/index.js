import { name, version } from "../goosemodModule.json";

import { showToast } from "@goosemod";
import { debug } from "@goosemod/logger";
import settingsPage from "@goosemod/settings";

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
        showToast(`Setting "${setting}" not found.`, {
          type: "error",
        });
        break;
    }
  } catch (error) {
    debug(name, error);
    showToast(`Failed to set setting "${setting}" to "${value}".`, {
      type: "error",
    });
  }
}

function updateSettings(value) {
  for (const setting in settings) {
    updateSetting(setting, value);
  }
}

export default {
  goosemodHandlers: {
    onImport: async () => {
      updateSettings();

      settingsPage.createItem(name, [
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

    getSettings: () => [settings],
    loadSettings: ([_settings]) => {
      settings = _settings;

      updateSettings();

      // . . . (Anything else you need to happen when loading settings.)
    },

    onRemove: async () => {
      settingsPage.removeItem(name);
      updateSettings(false); // Useful when dealing with CSS, remove if not applicable

      //! . . . (Make sure you completely stop and remove your module here!)
    },
  },
};
