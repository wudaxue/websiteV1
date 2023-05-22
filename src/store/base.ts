import { defineStore } from 'pinia'

interface State {
  signList: any[]
  groupList: any[]
  stationList: any[]
  terminalList: any[]
}

export const useBaseStore = defineStore('base', {
  state: (): State => ({
    signList: [],
    groupList: [],
    stationList: [],
    terminalList: [],
  }),
  getters: {
    signMap: (state): any => {
      return state.signList.reduce((map, item) => {
        map[item.id] = item
        return map
      }, {})
    },
    groupMap: (state): any => {
      return state.groupList.reduce((map, item) => {
        map[item.id] = item
        return map
      }, {})
    },
    stationMap: (state): any => {
      return state.stationList.reduce((map, item) => {
        map[item.id] = {
          id: item.id,
          name: item.name,
        }
        return map
      }, {})
    },
    terminalMap: (state): any => {
      return state.terminalList.reduce((map, item) => {
        map[item.id] = {
          id: item.id,
          name: item.terminal_number,
        }
        return map
      }, {})
    },
  },
  actions: {},
})
