import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class dScribeAIApi implements ICredentialType {
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-name-uppercase-first-char
	name = 'dScribeAIApi';
	displayName = 'dScribeAI API';
	documentationUrl = 'https://docs.dscribeai.com/quickstart#create-your-api-key';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiKey}}'
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiKey}}'
			},
			baseURL: 'https://app.dscribeai.com/api/v1/team',
		},
	};
}
