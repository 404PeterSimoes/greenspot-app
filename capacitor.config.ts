import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.petersimoes.greenspot',
    appName: 'GreenSpot',
    webDir: 'dist',
    plugins: {
        Keyboard: {
            resize: 'none',
        },
    },
};

export default config;
