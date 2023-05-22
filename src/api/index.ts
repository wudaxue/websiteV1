import request from '@/utils/request'

const path = {
  terminalList: 'terminal/list',
}

export function listTerminal() {
  return request
    .post(path.terminalList, {
      list_arg: {
        count_only: false,
        start: 0,
        count: 0,
      },
    })
    .then((res) => res?.terminal_list ?? [])
}
