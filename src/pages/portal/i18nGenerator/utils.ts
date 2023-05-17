import {message} from 'antd'

const SESSION_STORAGE_KEY = 'i18n-generator'
export const getCacheData = () => {
    const cacheData = window.localStorage.getItem(SESSION_STORAGE_KEY) || '{}'
    const {dataListMap, activeTab, tabs} = JSON.parse(cacheData)
    return {
        dataListMap, 
        activeTab,
        tabs,
    }
}

export const saveCacheData = (dataListMap:any, activeTab: string, tabs: any []) => {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
        dataListMap, 
        activeTab,
        tabs,
    }))
}

export function copyResult (copyContent: any) {
    const input = document.createElement('textarea');
    input.className='copy-shadow'
    input.value=copyContent
    document.body.appendChild(input);
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        message.success('SQL Copied Success!')
    }
    document.body.removeChild(input);
}

const WITH_ID_SCRIPT_TEMPLATE = `
INSERT INTO user_menu_multi_lang_cfg (user_menu_multi_lang_cfg_id, client_id, display_value, lang, client_type, menu ) VALUES ('{enIndex}','{key}','{value}', 'en', 'pc','{menu}');
INSERT INTO user_menu_multi_lang_cfg (user_menu_multi_lang_cfg_id, client_id, display_value, lang, client_type, menu ) VALUES ('{arIndex}','{key}', '{arValue}', 'ar', 'pc','{menu}');
`;

export const formatI18nData = (formattedData: any) => {
    const formatted = WITH_ID_SCRIPT_TEMPLATE.replaceAll('{key}', formattedData.key)
    .replaceAll('{enIndex}', formattedData.enIndex)
    .replaceAll('{arIndex}', formattedData.arIndex)
    .replaceAll('{value}', formattedData.en)
    .replaceAll('{arValue}', formattedData.ar)
    .replaceAll('{menu}', formattedData.menu);
    return formatted
}