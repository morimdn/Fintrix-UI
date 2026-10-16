# Figma readiness / design-to-code mapping

No editable Figma library has been created or verified. This contract prepares
future work; it does not claim a published Figma UI Kit.

| Design component  | React API                       | Variants / states                               |
| ----------------- | ------------------------------- | ----------------------------------------------- |
| Action/Button     | Button                          | primary/default/text; danger, loading, disabled |
| Action/IconButton | IconButton                      | label + icon; loading/disabled                  |
| Input/Text        | Input / Input.TextArea          | default/error/disabled; hover/focus             |
| Input/Selection   | Select, Checkbox, Radio, Switch | selected/unselected/disabled                    |
| Feedback/Status   | StatusIndicator                 | success/warning/danger/info/neutral             |
| Finance/Wallet    | WalletBalanceCard               | currency, locale, detail                        |
| Finance/Direction | PnLIndicator                    | positive/negative/zero                          |
| Finance/KYC       | KYCStatus                       | unverified/pending/verified/rejected            |
| Finance/Risk      | RiskLevelIndicator              | low/medium/high/unknown                         |
| Data/Grid         | DataGrid                        | selection, fixed columns, resize, pagination    |
| Overlay/Decision  | FormModal                       | open/closed, submitting/validation              |

Use token paths matching the code: `color/primary`, `color/surface`,
`color/positive`, `space/xl`, `radius/card`, `typography/body`, `sizing/control`.
Import generated JSON with a token tool supporting DTCG sRGB/dimensions; map
string shadows and font stacks manually. Theme collections: light/dark.
Density collections: comfortable/compact. Do not duplicate geometry per palette.
Use the documented 4px spacing scale and responsive constraints. Component names
and states above should match React props; product business states stay outside
primitive component names. Icons use semantic names and accessible text.
