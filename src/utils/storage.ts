import {Storage} from "@plasmohq/storage";
import {to} from 'await-to-js';

const storage = new Storage();

/**
 * 储存内容
 * @param key 值
 * @param value 内容
 */
const setStorage = async <T>(key: string, value: T) => {
    const [err, data] = await to(storage.set(key, JSON.stringify(value)));
    return [err, data];
}

const getStorage = async (key: string) => {
    const [err, data] = await to(storage.get(key));
    return [err, JSON.parse(data)];
}

export {
    setStorage,
    getStorage
}

