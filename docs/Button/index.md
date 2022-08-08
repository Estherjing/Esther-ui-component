<code src="./index.jsx" />

## Button
  #### API:
  |  属性  |  说明               |   类型   |   默认值   |  备注          |
  |  ---   |  ---                |---       |---        |  ---           |
  | block  |  块状元素          |  boolean   | false   |  值为true时，size属性失效|
  |  size  |  设置按钮大小        |  string  |  middle   | large / middle / small |
  |  type  |  设置按钮类型       |   string  |  default  | default / primary  |
  |  text  |  设置按钮的文本      |  string  |  ——       |       |
  |  disabled | 按钮失效状态     |  boolean  |  false    |         |
  |isDisClick| 是否禁止状态下可点击|boolean   | false     | 
  | onClick |  点击按钮时的回调   |  () => {} | ——       |      |
  | className | 自定义class     |  string   |  ——        |           |
  |  href  | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致|  string |  —— | ——|
  |  target| 相当于 a 链接的 target 属性，href 存在时生效| string | —— | ——|
