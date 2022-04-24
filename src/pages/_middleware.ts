import { NextResponse } from 'next/server';
//import type { NextRequest } from 'next/server';

//export function middleware(request: NextRequest,) {
export function middleware() {
	let response = NextResponse.next();
	//console.log('############# PAGES > middleware > NextResponse: ', response);
	return response;
}

//{
//	ua: ,
//	browser: ,
//	engine: ,
//	os: ,
//	device: ,
//	cpu: ,
//	isBot: 
//}
