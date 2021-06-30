import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const PortalContext = createContext(null);

const PORTAL_TYPES = {
  APPBAR: "APPBAR",
  SIDEBAR: "SIDEBAR",
  DRAWER: "DRAWER",
};

export const PortalProvider = ({ children }) => {
  const [portalMap, setPortalMap] = useState(new Map());

  const addPortalItem = useCallback((type, component) => {
    portalMap.set(type, component);
    const clonedMap = new Map(portalMap);
    setPortalMap(clonedMap);
  }, []);

  const removePortalItem = useCallback((type) => {
    portalMap.delete(type);
    const clonedMap = new Map(portalMap);
    setPortalMap(clonedMap);
  }, []);

  return (
    <PortalContext.Provider
      value={{ portalMap, addPortalItem, removePortalItem }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const PortalSource = ({ type, children }) => {
  const { addPortalItem, removePortalItem } = useContext(PortalContext);

  useEffect(() => {
    addPortalItem(type, children);

    return () => removePortalItem(type);
  }, [type, children]);

  return null;
};

export const PortalTarget = ({ type }) => {
  const { portalMap } = useContext(PortalContext);
  return portalMap.get(type) || null;
};

/**
 *
 * Portal Components
 */
export const AppbarSource = ({ children }) => (
  <PortalSource type={PORTAL_TYPES.APPBAR} children={children} />
);

export const AppbarTarget = () => <PortalTarget type={PORTAL_TYPES.APPBAR} />;

export const SidebarSource = ({ children }) => (
  <PortalSource type={PORTAL_TYPES.SIDEBAR}>{children}</PortalSource>
);

export const SidebarTarget = () => <PortalTarget type={PORTAL_TYPES.SIDEBAR} />;

export const DrawerSource = ({ children }) => (
  <PortalSource type={PORTAL_TYPES.DRAWER}>{children}</PortalSource>
);

export const DrawerTarget = () => <PortalTarget type={PORTAL_TYPES.DRAWER} />;
