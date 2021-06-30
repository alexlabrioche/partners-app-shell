import { useState } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import { AnimatePresence } from "framer-motion";

import {
  PortalProvider,
  AppbarSource,
  AppbarTarget,
  SidebarSource,
} from "./shared/portals";

import "./app.css";

import {
  slideTopVariant,
  slideBottomVariant,
  slideRightVariant,
  slideLeftVariant,
  modalVariant,
} from "./components/animations/constants";

import Modal, {
  ModalContent,
  ModalActions,
  ModalTitle,
} from "./components/Modal";

import Drawer, {
  DrawerContent,
  DrawerActions,
  DrawerHeader,
} from "./components/Drawer";

import MotionWrapper from "./components/animations/MotionWrapper";

const DRAWER_VARIANT = {
  TOP: { animation: slideTopVariant, className: "top-drawer" },
  BOTTOM: { animation: slideBottomVariant, className: "bottom-drawer" },
  RIGHT: { animation: slideRightVariant, className: "right-drawer" },
};

const Sidebar = ({ visible, hide, children }) => {
  const onClickOutside = (e) => {
    e.stopPropagation();
    hide();
  };

  const preventClickOutside = (e) => e.stopPropagation();

  if (!visible) {
    return null;
  }

  return (
    <SidebarSource>
      <MotionWrapper onClick={onClickOutside} className="sidebar-menu-overlay">
        <MotionWrapper
          variants={slideLeftVariant}
          onClick={preventClickOutside}
          className="sidebar"
        >
          {children}
        </MotionWrapper>
      </MotionWrapper>
    </SidebarSource>
  );
};

const MenuNavigation = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <BrowserView viewClassName="menu-navigation">
        <Link to="/">H</Link>
        <Link to="/planning">P</Link>
        <Link to="/students">S</Link>
        <Link to="/settings">S</Link>
        <Link to="/billing">B</Link>
        <button onClick={() => setShowSidebar(true)}>{"-->"}</button>
      </BrowserView>

      <MobileView viewClassName="menu-navigation">
        <button onClick={() => setShowSidebar(true)}>burger</button>
        <Link to="/">H</Link>
        <Link to="/planning">P</Link>
        <Link to="/students">S</Link>
      </MobileView>

      <Sidebar visible={showSidebar} hide={() => setShowSidebar(false)}>
        <Link to="/">home</Link>
        <Link to="/planning">planning</Link>
        <Link to="/students">students</Link>
        <Link to="/settings">settings</Link>
        <Link to="/billing">billing</Link>
      </Sidebar>
    </>
  );
};

const TopNavigation = () => {
  return (
    <div className="top-navigation">
      <h4>partners app</h4>
      <AppbarTarget />
    </div>
  );
};

const Home = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <div
      style={{ width: "100%", backgroundColor: "lightblue", height: "200vh" }}
    >
      <AppbarSource>Home</AppbarSource>
      <button onClick={() => setShowDrawer(true)}>Drawer Action Click</button>
      <Drawer visible={showDrawer} hide={() => setShowDrawer(false)}>
        <Switch>
          <Route path="/details" component={() => <h2>home details</h2>} />
          <Route
            path="/"
            component={() => (
              <>
                <h2>home</h2>
                <Link to="/details">see details</Link>
              </>
            )}
          />
        </Switch>
      </Drawer>
    </div>
  );
};

const Planning = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  let { path, url } = useRouteMatch();
  let history = useHistory();
  const [modal, setModal] = useState(false);
  return (
    <div style={{ width: "100%", backgroundColor: "tomato", height: "200vh" }}>
      <Modal
        visible={!!modal}
        animation={modal}
        hide={() => {
          setModal(false);
        }}
      >
        <ModalTitle>Hi, I'm a Modal Component</ModalTitle>
        <ModalContent>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          ea unde nulla cum dolorem sapiente iste autem recusandae accusamus
          voluptates, mollitia ut. Deserunt, voluptate accusantium quia aut quis
          atque facere! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Aspernatur, obcaecati molestias doloribus quasi illum at, quos
          reiciendis possimus molestiae velit, harum cupiditate dolore
          distinctio consequatur quo eos ut repellendus nostrum.
        </ModalContent>
        <ModalActions>
          <button onClick={() => alert("Nope...")}>Nope...</button>
          <button
            onClick={() => {
              setModal(false);
            }}
          >
            OK!
          </button>
        </ModalActions>
      </Modal>
      <AppbarSource>
        <div>
          Planning
          <button onClick={() => setModal(true)}>planning Action</button>
        </div>
      </AppbarSource>
      <div
        style={{
          height: "50px",
          backgroundColor: "blue",
          position: "fixed",
          width: "100%",
        }}
      >
        Calendar Day selector
      </div>
      <div style={{ height: "50px" }} />
      <div className="container">
        <button onClick={() => setShowDrawer(true)}>Drawer Action Click</button>
        <Drawer
          visible={showDrawer}
          hide={() => {
            setShowDrawer(false);
            history.goBack();
          }}
        >
          <Switch>
            <Route
              path={`${path}/details`}
              component={() => <h2>Planning details</h2>}
            />
            <Route
              path={path}
              component={() => (
                <>
                  <h2>Planning</h2>
                  <Link to={`${url}/details`}>see details</Link>
                </>
              )}
            />
          </Switch>
        </Drawer>
      </div>
    </div>
  );
};

const DrawersTest = () => {
  const [drawer, setDrawer] = useState(false);
  const [routerDrawer, setRouterDrawer] = useState(false);
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <div style={{ width: "100%", backgroundColor: "pink", height: "100%" }}>
      <h2>Drawers</h2>
      <button onClick={() => setDrawer(true)}>basic drawer</button>
      <button onClick={() => setRouterDrawer(true)}>router drawer</button>
      <h2>Modal</h2>
      <button onClick={() => setModal(modalVariant)}>Show</button>
      <Drawer
        visible={!!drawer}
        hide={() => {
          setDrawer(false);
        }}
      >
        <DrawerHeader>Super long content drawer</DrawerHeader>
        <DrawerContent>
          <h1>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti
            accusantium tempore, numquam modi et quidem quisquam qui fugit.
            Nobis incidunt voluptates voluptate, impedit laudantium deserunt
            voluptatibus quae officia neque rerum.Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Deleniti accusantium tempore, numquam
            modi et quidem quisquam qui fugit. Nobis incidunt voluptates
            voluptate, impedit laudantium deserunt voluptatibus quae officia
            neque rerum.Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Deleniti accusantium tempore, numquam modi et quidem quisquam
            qui fugit. Nobis incidunt voluptates voluptate, impedit laudantium
            deserunt voluptatibus quae officia neque rerum.Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Deleniti accusantium
            tempore, numquam modi et quidem quisquam qui fugit. Nobis incidunt
            voluptates voluptate, impedit laudantium deserunt voluptatibus quae
            officia neque rerum. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Deleniti accusantium tempore, numquam modi et
            quidem quisquam qui fugit. Nobis incidunt voluptates voluptate,
            impedit laudantium deserunt voluptatibus quae officia neque
            rerum.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Deleniti accusantium tempore, numquam modi et quidem quisquam qui
            fugit. Nobis incidunt voluptates voluptate, impedit laudantium
            deserunt voluptatibus quae officia neque rerum.
          </h1>
          <button onClick={() => setModal(modalVariant)}>Show modal</button>
        </DrawerContent>
        <DrawerActions>
          <button
            onClick={() => {
              setDrawer(false);
            }}
          >
            Close
          </button>
        </DrawerActions>
      </Drawer>

      <Drawer
        visible={!!routerDrawer}
        hide={() => {
          setRouterDrawer(false);
        }}
      >
        <DrawerHeader>Router drawer</DrawerHeader>
        <DrawerContent>
          <>
            <Link to="/test/a">A</Link>
            <br />
            <Link to="/test/b">B</Link>
            <br />
            <Link to="/test/c">C</Link>
            <AnimatePresence exitBeforeEnter key={pathname}>
              <Switch>
                <Route
                  path="/test/b"
                  component={() => (
                    <MotionWrapper>
                      <h1>View: B</h1>
                    </MotionWrapper>
                  )}
                />
                <Route
                  path="/test/c"
                  component={() => (
                    <MotionWrapper>
                      <h1>View: C</h1>
                    </MotionWrapper>
                  )}
                />
                <Route
                  path="/test/a"
                  component={() => (
                    <MotionWrapper>
                      <h1>View: A </h1>
                    </MotionWrapper>
                  )}
                />
              </Switch>
            </AnimatePresence>
          </>
        </DrawerContent>
        <DrawerActions>
          <button onClick={() => history.goBack()}>{"<-- Back"}</button>
          <button
            onClick={() => {
              setDrawer(false);
            }}
          >
            Close
          </button>
        </DrawerActions>
      </Drawer>

      <Modal
        visible={!!modal}
        animation={modal}
        hide={() => {
          setModal(false);
        }}
      >
        <ModalTitle>Hi, I'm a Modal Component</ModalTitle>
        <ModalContent>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          ea unde nulla cum dolorem sapiente iste autem recusandae accusamus
          voluptates, mollitia ut. Deserunt, voluptate accusantium quia aut quis
          atque facere! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Aspernatur, obcaecati molestias doloribus quasi illum at, quos
          reiciendis possimus molestiae velit, harum cupiditate dolore
          distinctio consequatur quo eos ut repellendus nostrum.
        </ModalContent>
        <ModalActions>
          <button onClick={() => alert("Nope...")}>Nope...</button>
          <button
            onClick={() => {
              setModal(false);
            }}
          >
            OK!
          </button>
        </ModalActions>
      </Modal>
    </div>
  );
};

function AppRouter() {
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch>
        <Route path="/planning" component={Planning} />
        <Route path="/students" component={Home} />
        <Route path="/settings" component={Home} />
        <Route path="/billing" component={Home} />
        <Route path="/test" component={DrawersTest} />
        <Route path="/" component={Home} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <PortalProvider>
      <div className="app">
        <TopNavigation />
        <MenuNavigation />
        <div className="content">
          <AppRouter />
        </div>
      </div>
    </PortalProvider>
  );
}

export default App;
