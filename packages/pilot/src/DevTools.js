/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import SliderMonitor from 'redux-slider-monitor'
import Dispatcher from 'redux-devtools-dispatch'
import MultipleMonitors from 'redux-devtools-multiple-monitors'

/* eslint-disable function-paren-newline */

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-b"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
    defaultIsVisible={false}
  >
    <MultipleMonitors>
      <LogMonitor theme="tomorrow" />
      <Dispatcher />
    </MultipleMonitors>
    <SliderMonitor keyboardEnabled />
  </DockMonitor>
)

/* eslint-enable function-paren-newline */

export default DevTools
