export default interface SubPageProps {
    renderContent: () => React.JSX.Element,
    navigation: any,
    mode? : 'normal' | 'fullscreen',
    backButtonPosition?: 'default' | 'absolute'
}