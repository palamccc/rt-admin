'use strict';
import React from 'react';
import { AppBar, Panel, Layout, NavDrawer, List, ListItem } from 'react-toolbox';
import JourneyEditor from './journey-editor.jsx';

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Panel>
          <AppBar>ConvertCart Journey Editor</AppBar>
          <Layout >
            <NavDrawer>
              <List selectable>
                <ListItem caption="Item 11" />
                <ListItem caption="Item 22" />
              </List>
            </NavDrawer>
            <Panel>
              <JourneyEditor />
            </Panel>
          </Layout>
        </Panel>
      </Layout>
    );
  }
}

export default App;
