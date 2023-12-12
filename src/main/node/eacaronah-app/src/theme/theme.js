// const theme = {
//     color: {
//       darkBackground: "#fa9e0d",
//       lightBackground: "#fbf1d9",
//       invalid: "#ff0000"
//     },
//     spacing: {
//         s: 8,
//         m: 12,
//         l: 16,
//         xl: 24
//     },
//     borderRadius: {
//         s: 8,
//         xll: 100,
//     },
//     borderWidth: 2,
//     font: {
//         lineHeight: {
//             xs: 16,
//             s: 20,
//             m: 24,
//             l: 28,
//             xl: 32,
//             xxl: 40,
//         },
//         size: {
//             xs: 12,
//             s: 14,
//             m: 16,
//             l: 18,
//             xl: 20,
//             xxl: 24
//         },
//         weight: {
//           n: 400,
//           m: 500,
//           sb: 600,
//           b: 700

import {AppContext, RIDE} from "../store/context/app";
import {useContext} from "react";

const theme = (ride) => {
    return {
        color: {
            darkBackground: ride === RIDE ? "#fa9e0d" : "#75B6C3",
            lightBackground: ride === RIDE ? "#fbf1d9" : "#DFEEF0",
            lightBackgroundSecondary: "rgba(217, 217, 217, 0.15)",
            invalid: "#ff0000"
        },
        spacing: {
            s: 8,
            m: 12,
            l: 16,
            xl: 24
        },
        borderRadius: {
            s: 8,
            xll: 100,
        },
        font: {
            lineHeight: {
                xs: 16,
                s: 20,
                m: 24,
                l: 28,
                xl: 32,
                xxl: 40,
            },
            size: {
                xs: 12,
                s: 14,
                m: 16,
                l: 18,
                xl: 20,
                xxl: 24
            },
            weight: {
              n: 400,
              m: 500,
              sb: 600,
              b: 700
            },
        },
        size: {
            full: "100%",
        }
    }
}

export default theme
