import * as path from 'path';
import * as dotenv from 'dotenv';

import Logger from '../libs/Logger';

const requiredENV = ['NODE_ENV', 'DATABASE_URL', 'DISCORD_TOKEN', 'PRIVATE_BOT', 'OSU_API_KEY'];

class Environment {
    public init(): void {
        dotenv.config({ path: path.resolve(__dirname, '../../.env') });

        for (let param of requiredENV) {
            if (this.isUndefinedOrEmpty(process.env[param]))
                throw new Error(`.env ${param} is undefined`);
        }

        // NODE_ENV Checks
        if (this.get().NODE_ENV != 'production' && this.get().NODE_ENV != 'development')
            throw new Error('.env NODE_ENV must be either "production" or "development"');

        // TODO: Discord token check

        Logger.log('info', `Running in ${process.env.NODE_ENV} environment`);
    }

    public get(): any {
        const NODE_ENV = process.env.NODE_ENV;

        const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
        const DEVELOPER_IDS = process.env.DEVELOPER_IDS;
        const PRIVATE_BOT = process.env.PRIVATE_BOT;

        const OSU_API_KEY = process.env.OSU_API_KEY;
        const YOUTUBE_COOKIE_BASE64 = process.env.YOUTUBE_COOKIE_BASE64;

        return {
            NODE_ENV,

            DISCORD_TOKEN,
            DEVELOPER_IDS,
            PRIVATE_BOT,

            OSU_API_KEY,
            YOUTUBE_COOKIE_BASE64
        };
    }

    private isUndefinedOrEmpty(value: String | undefined): boolean {
        if (typeof value === 'undefined') return true;

        if (value === undefined) return true;

        if (value === '') return true;

        return false;
    }
}

export default new Environment();
