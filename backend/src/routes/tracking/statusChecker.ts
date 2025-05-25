// src/monitor/statusChecker.ts
import axios from 'axios';
import ping from 'ping';
import dns from 'node:dns/promises';
import tls from 'node:tls';
import sslChecker from 'ssl-checker';

export interface ProjetoStatus {
	http: boolean;
	ping: boolean;
	ssl: boolean;
	dns: boolean;
}

export async function checkPing(ip: string): Promise<boolean> {
	try {
		const res = await ping.promise.probe(ip);
		return res.alive;
	} catch {
		return false;
	}
}

export async function checkHttp(domain: string): Promise<boolean> {
	try {
		await axios.get(domain);
		return true;
	} catch {
		return false;
	}
}

export async function checkDns(domain: string): Promise<boolean> {
	try {
		await dns.lookup(domain);
		return true;
	} catch {
		return false;
	}
}

export async function checkSsl(domain: string): Promise<boolean> {
	try {
		const cleanDomain = domain.replace(/^https?:\/\//, '').split('/')[0]; // remove http:// e caminhos
		const sslInfo = await sslChecker(cleanDomain, {
			method: 'GET',
			port: 443,
		});
		return sslInfo.valid;
	} catch {
		return false;
	}
}
