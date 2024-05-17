import { EIP1193Provider, createStore } from "mipd";
import { useMemo, useState, useSyncExternalStore } from "react";

export default function Home() {
  const [command, setCommand] = useState("eth_gasPrice");
  const walletProvidersStore = useMemo(() => {
    return createStore();
  }, []);

  const getServerSnapshot = () => {
    return [];
  };


  const availableWalletProviders = useSyncExternalStore(
    walletProvidersStore.subscribe,
    walletProvidersStore.getProviders,
    getServerSnapshot
  );

  const executeMethod = async (provider: EIP1193Provider) => {
    try {
      const result = await provider?.request({ method: command as any });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "10px",
          width: "200px",
        }}
      >
        {availableWalletProviders.map(({ provider, info }) => (
          <button
            style={{ padding: "4px", cursor: "pointer" }}
            key={info.rdns}
            onClick={() => {
              executeMethod(provider);
            }}
          >
            {info.name}
          </button>
        ))}
        <input value={command} onChange={(e) => setCommand(e.target.value)} />
      </div>
    </div>
  );
}

