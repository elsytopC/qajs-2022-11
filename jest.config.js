export default {
    testMatch: ['**/specs/**/*.spec.*'],
        "transform": {
            "^.+\\.[t|j]sx?$": "babel-jest",
        },
    reporters: [
        "default",
    ["./node_modules/jest-html-reporter", {
        "pageTitle": "Test Report",
        "darkTheme": true
    }]
    ],
    //reporters: ['default', 'jest-allure'],
    testRunner: 'jest-jasmine2',
    setupFilesAfterEnv: ['jest-allure/dist/setup'],
}
