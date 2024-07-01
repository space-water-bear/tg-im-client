import { useAuthStore } from "@/store";

interface Register {
    xcode: number
    handler: (data: any) => void
}


class YLSSE {
    constructor() {
        this.initConfig = {};
        this.Interceptors();
    }

    private static initConfig: { [key: number]: (data: any) => void };
    private readonly url = `${import.meta.env.BASE_URL}/sse`;
    private eventSource: EventSource | null = null;

    // 拦截器，检查是否存在token
    private Interceptors(): void {
        // 存储初始化
        const authState = useAuthStore();
        if (!authState.token) { // token校验
            throw new Error("token is not null");
        }
        const now = new Date().getTime();
        const expired = authState.expired* 1000 - now <= 0
        if (expired) { // token过期
            throw new Error("token is expired");
        }
    }

    public register(data: Register): void {
        YLSSE.initConfig[data.xcode] = data.handler
    }

    private handleMsg(msg: {xcode: number, data: any}) {
        const handle = YLSSE.initConfig[msg.xcode]
        if (handle) {
            handle(msg.data)
        } else {
            console.error(`xcode: ${msg.xcode} not found`)
        }
    }

    public start(): void {
        this.eventSource = new EventSource(this.url);

        this.eventSource.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            this.handleMsg(msg);
        };

        this.eventSource.onerror = (error) => {
            console.error('EventSource error:', error);
            this.stop()
        };
    }

    public stop(): void {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }

}

export const sse = new YLSSE();