// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo : React.FC = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */

    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 190.000000 52.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="translate(0.000000,52.000000) scale(0.100000,-0.100000)" fill={theme.palette.primary.dark} stroke="none">
        <path
          d="M52 318 c-18 -101 -32 -196 -32 -211 0 -18 11 -39 28 -57 36 -35 106
-44 300 -38 147 5 187 16 217 62 12 18 85 378 85 419 0 4 -28 7 -62 5 l-63 -3
-26 -145 c-14 -80 -29 -162 -33 -182 l-7 -38 -154 0 c-85 0 -155 3 -155 8 0 4
14 79 30 167 16 88 30 168 30 178 0 14 -10 17 -63 17 l-63 0 -32 -182z"
          fill={theme.palette.primary.dark}
        />
        <path
          d="M720 493 c0 -5 -18 -110 -40 -236 -22 -125 -40 -232 -40 -238 0 -8
75 -10 243 -7 210 3 246 6 275 21 38 21 66 75 76 149 6 38 4 50 -12 65 -18 18
-18 19 11 44 28 23 30 31 31 93 1 62 -1 70 -27 92 -28 24 -28 24 -273 24 -134
0 -244 -3 -244 -7z m420 -112 c0 -11 -4 -31 -10 -45 -9 -26 -10 -26 -129 -26
-115 0 -119 -1 -125 -22 -3 -13 -6 -33 -6 -45 0 -23 2 -23 114 -23 65 0 117
-4 121 -10 3 -5 3 -25 -1 -45 l-6 -35 -154 0 c-85 0 -154 4 -154 8 0 12 40
236 45 250 3 9 43 12 155 12 142 0 150 -1 150 -19z"
          fill={theme.palette.primary.dark}
        />
        <path
          d="M1403 485 c-17 -7 -39 -25 -48 -38 -17 -27 -65 -266 -65 -328 0 -49
33 -87 85 -99 54 -13 412 -13 420 0 3 5 9 32 12 60 l6 50 -197 0 c-182 0 -196
1 -196 18 0 26 38 231 45 243 4 5 91 9 204 9 l198 0 7 38 c3 20 6 43 6 50 0
18 -433 16 -477 -3z"
          fill={theme.palette.primary.dark}
        />
        <path
          d="M1501 270 c-5 -25 -8 -46 -6 -48 1 -2 76 -3 166 -3 l164 0 6 28 c17
73 27 68 -156 68 l-164 0 -10 -45z"
          fill={theme.palette.primary.dark}
        />
      </g>
    </svg>
  );
};

export default Logo;
