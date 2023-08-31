import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
	name: 'my-custom-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base':
			"LibreBaskerville, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
		'--theme-font-family-heading':
			'Montserrat, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '0px',
		'--theme-rounded-container': '0px',
		'--theme-border-base': '4px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '255 255 255',
		'--on-warning': '255 255 255',
		'--on-error': '255 255 255',
		'--on-surface': '0 0 0',
		// =~= Theme Colors  =~=
		// primary | #26a269
		'--color-primary-50': '222 241 233', // #def1e9
		'--color-primary-100': '212 236 225', // #d4ece1
		'--color-primary-200': '201 232 218', // #c9e8da
		'--color-primary-300': '168 218 195', // #a8dac3
		'--color-primary-400': '103 190 150', // #67be96
		'--color-primary-500': '38 162 105', // #26a269
		'--color-primary-600': '34 146 95', // #22925f
		'--color-primary-700': '29 122 79', // #1d7a4f
		'--color-primary-800': '23 97 63', // #17613f
		'--color-primary-900': '19 79 51', // #134f33
		// secondary | #a72d16
		'--color-secondary-50': '242 224 220', // #f2e0dc
		'--color-secondary-100': '237 213 208', // #edd5d0
		'--color-secondary-200': '233 203 197', // #e9cbc5
		'--color-secondary-300': '220 171 162', // #dcaba2
		'--color-secondary-400': '193 108 92', // #c16c5c
		'--color-secondary-500': '167 45 22', // #a72d16
		'--color-secondary-600': '150 41 20', // #962914
		'--color-secondary-700': '125 34 17', // #7d2211
		'--color-secondary-800': '100 27 13', // #641b0d
		'--color-secondary-900': '82 22 11', // #52160b
		// tertiary | #8ff0a4
		'--color-tertiary-50': '238 253 241', // #eefdf1
		'--color-tertiary-100': '233 252 237', // #e9fced
		'--color-tertiary-200': '227 251 232', // #e3fbe8
		'--color-tertiary-300': '210 249 219', // #d2f9db
		'--color-tertiary-400': '177 245 191', // #b1f5bf
		'--color-tertiary-500': '143 240 164', // #8ff0a4
		'--color-tertiary-600': '129 216 148', // #81d894
		'--color-tertiary-700': '107 180 123', // #6bb47b
		'--color-tertiary-800': '86 144 98', // #569062
		'--color-tertiary-900': '70 118 80', // #467650
		// success | #013580
		'--color-success-50': '217 225 236', // #d9e1ec
		'--color-success-100': '204 215 230', // #ccd7e6
		'--color-success-200': '192 205 223', // #c0cddf
		'--color-success-300': '153 174 204', // #99aecc
		'--color-success-400': '77 114 166', // #4d72a6
		'--color-success-500': '1 53 128', // #013580
		'--color-success-600': '1 48 115', // #013073
		'--color-success-700': '1 40 96', // #012860
		'--color-success-800': '1 32 77', // #01204d
		'--color-success-900': '0 26 63', // #001a3f
		// warning | #835c1e
		'--color-warning-50': '236 231 221', // #ece7dd
		'--color-warning-100': '230 222 210', // #e6ded2
		'--color-warning-200': '224 214 199', // #e0d6c7
		'--color-warning-300': '205 190 165', // #cdbea5
		'--color-warning-400': '168 141 98', // #a88d62
		'--color-warning-500': '131 92 30', // #835c1e
		'--color-warning-600': '118 83 27', // #76531b
		'--color-warning-700': '98 69 23', // #624517
		'--color-warning-800': '79 55 18', // #4f3712
		'--color-warning-900': '64 45 15', // #402d0f
		// error | #7229c0
		'--color-error-50': '234 223 246', // #eadff6
		'--color-error-100': '227 212 242', // #e3d4f2
		'--color-error-200': '220 202 239', // #dccaef
		'--color-error-300': '199 169 230', // #c7a9e6
		'--color-error-400': '156 105 211', // #9c69d3
		'--color-error-500': '114 41 192', // #7229c0
		'--color-error-600': '103 37 173', // #6725ad
		'--color-error-700': '86 31 144', // #561f90
		'--color-error-800': '68 25 115', // #441973
		'--color-error-900': '56 20 94', // #38145e
		// surface | #457cb3
		'--color-surface-50': '227 235 244', // #e3ebf4
		'--color-surface-100': '218 229 240', // #dae5f0
		'--color-surface-200': '209 222 236', // #d1deec
		'--color-surface-300': '181 203 225', // #b5cbe1
		'--color-surface-400': '125 163 202', // #7da3ca
		'--color-surface-500': '69 124 179', // #457cb3
		'--color-surface-600': '62 112 161', // #3e70a1
		'--color-surface-700': '52 93 134', // #345d86
		'--color-surface-800': '41 74 107', // #294a6b
		'--color-surface-900': '34 61 88' // #223d58
	}
};
