import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import {
  PolygonMumbai,
  ArbitrumGoerli,
  EthereumSepolia,
  ChainInfo,
} from "@particle-network/chains";
import { ParticleProvider } from "@particle-network/provider";
import {
  ConnectConfig,
  ParticleConnect,
  Provider,
  // metaMask,
  // walletconnect,
} from "@particle-network/connect";

// "email", "phone", "facebook", "google", "apple", "discord", "github", "twitch", "twitter", "microsoft", "linkedin", "jwt"
enum SocialLoginType {
  Email = "email",
  Twitter = "twitter",
  Github = "github",
  Google = "google",
  Phone = "phone",
  JWT = "jwt",
}

enum ParticleConnectType {
  MetaMask = "metamask",
  Particle = "particle",
  WalletConnect = "walletconnect_v2",
}

class ParticleService {
  private _client: ParticleNetwork | null = null;
  private _particleProvider: ParticleProvider | null = null;
  private _connectKit: ParticleConnect | null = null;
  private _provider: Provider | null = null;

  public get version(): string {
    return "0.0.1";
  }

  public get env(): any {
    // @ts-ignore
    return import.meta.env;
  }

  private get appId(): string {
    return this.env.VITE_APP_PARTICLE_APP_ID ?? "";
  }

  private get projectId(): string {
    return this.env.VITE_APP_PARTICLE_PROJECT_ID ?? "";
  }

  private get clientKey(): string {
    return this.env.VITE_APP_PARTICLE_CLIENT_KEY ?? "";
  }

  private get connectConfig(): ConnectConfig {
    const config: ConnectConfig = {
      projectId: this.projectId,
      clientKey: this.clientKey,
      appId: this.appId,
      chains: [PolygonMumbai, EthereumSepolia],
      wallets: [
        // metaMask({
        //   projectId: env.VITE_APP_WALLETCONNECT_PROJECT_ID,
        //   showQrModal: false,
        // }),
        // walletconnect({
        //   projectId: env.VITE_APP_WALLETCONNECT_PROJECT_ID,
        //   showQrModal: true,
        // }),
      ],
    };

    return config;
  }

  private get connectKit(): ParticleConnect {
    if (!this._connectKit) {
      this._connectKit = new ParticleConnect(this.connectConfig);
    }
    return this._connectKit;
  }

  public get particleProvider(): ParticleProvider {
    if (!this._particleProvider) {
      this._particleProvider = new ParticleProvider(this.client.auth);
    }
    return this._particleProvider;
  }

  public get client(): ParticleNetwork {
    return this.getClient(PolygonMumbai);
  }

  public get provider(): Provider | null {
    return this._provider;
  }

  public get hasLogin() {
    return this.client.auth.isLogin();
  }

  public get userInfo() {
    return this.client.auth.getUserInfo();
  }

  public async onConnect(
    id: ParticleConnectType = ParticleConnectType.Particle,
    options?: any
  ) {
    try {
      this._provider = await this.connectKit.connect(id, options);
    } catch (error) {
      console.error("connectWallet", error);
    }
  }

  public getClient(chain: ChainInfo): ParticleNetwork {
    if (!this._client) {
      this._client = new ParticleNetwork({
        projectId: this.projectId,
        clientKey: this.clientKey,
        appId: this.appId,
        chainName: chain.name,
        chainId: chain.id,
        wallet: {
          displayWalletEntry: true,
          defaultWalletEntryPosition: WalletEntryPosition.BR,
          uiMode: "auto",
          supportChains: [PolygonMumbai, EthereumSepolia],
          customStyle: {},
        },
        securityAccount: {
          promptSettingWhenSign: 1,
          promptMasterPasswordSettingWhenLogin: 1,
        },
      });
      this._client.setAuthTheme({
        uiMode: "auto",
        displayCloseButton: true,
        displayWallet: true,
        modalBorderRadius: 10,
      });
      this._client.setERC4337(true);
    }
    return this._client;
  }

  public clearChainInfo() {
    this._client = null;
    this._particleProvider = null;
  }

  /**
   * {
    "uuid": "cb93d800-3126-4c76-9fc9-08db8108423d",
    "created_at": "2023-10-25T08:03:01.000Z",
    "updated_at": "2023-10-25T08:03:01.000Z",
    "phone": null,
    "email": null,
    "name": "enixlee0x00",
    "avatar": "",
    "facebook_id": null,
    "facebook_email": null,
    "google_id": null,
    "google_email": null,
    "apple_id": null,
    "apple_email": null,
    "twitter_id": "1526755844737880064",
    "twitter_email": "",
    "telegram_id": null,
    "telegram_phone": null,
    "discord_id": null,
    "discord_email": null,
    "github_id": null,
    "github_email": null,
    "twitch_id": null,
    "twitch_email": null,
    "microsoft_id": null,
    "microsoft_email": null,
    "linkedin_id": null,
    "linkedin_email": null,
    "jwt_id": null,
    "passkeys_id": null,
    "thirdparty_user_info": {
        "provider": "twitterv1",
        "user_info": {
            "id": "1526755844737880064",
            "name": "enixlee0x00",
            "email": "",
            "picture": ""
        }
    },
    "token": "waawadawdadasdasdaasdad",
    "security_account": {
        "email": null,
        "phone": null,
        "has_set_master_password": true,
        "has_set_payment_password": false,
        "payment_password_updated_at": null
    },
    "wallets": [
        {
            "uuid": "aa4e1919-88c9-4d8f-8dd9-63dbc01151d6",
            "chain_name": "solana",
            "public_address": "3BPv3MiCkhRAddsrGe9mdxFWy9CyT5WTQeWxMXYhLZQc"
        },
        {
            "uuid": "b1b3588e-a2eb-414d-864b-6d785b04abbd",
            "chain_name": "evm_chain",
            "public_address": "0xd9e5bee269EFfD7d3BFA92332813C913E4B9999F"
        }
    ],
    "redirect_type": "login"
}
   */

  async isLoginAsync(): Promise<any> {
    // return userinfo
    return await this.client.auth.isLoginAsync();
  }

  async login(loginType = SocialLoginType.Email) {
    return await this.client.auth.login({
      preferredAuthType: loginType,
    });
  }

  async logout() {
    await this.client.auth.logout();
  }
}

const context = globalThis as any;
context.particleEngine = {
  SocialLoginType,
  ParticleConnectType,
  service: new ParticleService(),
  chains: [PolygonMumbai, ArbitrumGoerli, EthereumSepolia],
};
