
const appStyle = {
    fontFamilyWorkSans: "Work Sans, sans-serif",
    fontFamilyRoboto: "Roboto, Calibri",

    colorOffBlack: "rgb(79, 84, 87)",  //#4f5457
    colorGreyLight: "#6D6E6F",
    colorBlueGreyDark: "#5F7B86",
    colorBlueGrey: "#85A2A8",
    colorBlueGreyLight:"#AAB9B4",
    colorRed: "#EB7077",
    colorGreen: "#2BBBAD",

    fontSizeSmall: "0.8rem",
    fontSizeDefault: "0.88rem",
    fontSizeSubHeader: "1rem",
    fontSizeHeader: "1.5rem"
}

const appTheme = {
    buttonDefault: {
        //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: 'linear-gradient(65deg, ' + appStyle.colorBlueGreyDark + ' 100%, #CFCCB9 90%)',
        borderRadius: 40,
        border: 0,
        color: '#FFF',
        height: 44,
        padding: '0 40px',
        boxShadow: '0 3px 5px 2px rgba(79, 84, 87, 0.3)',
        fontFamily: appStyle.fontFamilyWorkSans,
        fontWeight: "500"
    },
    textSmall: {
        color: appStyle.colorGreyLight,
        fontSize: appStyle.fontSizeSmall,
        textTransform: 'capitalize',
        fontFamily: appStyle.fontFamilyWorkSans,
        fontWeight: "400"
    },
    textSmallWhite: {
        color: "#FFF",
        fontSize: appStyle.fontSizeSmall,
        textTransform: 'capitalize',
        fontFamily: appStyle.fontFamilyWorkSans,
        fontWeight: "400"
    },
    textDefault: {
        color: appStyle.colorOffBlack,
        fontSize: appStyle.fontSizeDefault,
        fontFamily: appStyle.fontFamilyWorkSans,
        fontWeight: "400"
    },
    textSubHeader: {
        color: appStyle.colorOffBlack,
        fontSize: appStyle.fontSizeSubHeader,
        fontWeight: "500",
        letterSpacing: "0.6px"
    },
    textHeader: {
        color: appStyle.colorOffBlack,
        fontSize: appStyle.fontSizeHeader,
        fontWeight: "700",
        letterSpacing: "0.6px"
    },
    textAutob: { color: "#FFF", fontWeight: "bold", letterSpacing: "5px" }
}

module.exports = { appStyle, appTheme }