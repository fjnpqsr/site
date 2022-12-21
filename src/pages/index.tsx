import { history } from 'umi';

export default function HomePage() {
    // config to replace to home page
    history.replace('/portal');
    return null;
}
