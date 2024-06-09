export default interface SubPageProps {
    renderContent: () => JSX.Element,
    navigation: any,
    mode? : 'normal' | 'fullscreen'
}