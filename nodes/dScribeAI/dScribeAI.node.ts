/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class dScribeAI implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'dScribeAI',
		name: 'dscribeai',
		icon: 'file:dscribeai.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from dScribeAI',
		defaults: {
			name: 'dScribeAI',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'dScribeAIApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.dscribeai.com/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},

		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: "Social Media Video",
						value: "socialMediaVideo",
					},
				],
				default: 'socialMediaVideo',
			},

			// Operations will go here
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'socialMediaVideo',
						],
					},
				},
				options: [
					{
						name: 'Analyze',
						value: 'analyze',
						action: 'Analyze social media post',
						description: 'Analyze a social media post',
						routing: {
							request: {
								method: 'POST',
								url: '/analyze',
							},
						},
					},
					{
						name: 'Transcribe',
						value: 'transcribe',
						action: 'Transcribe a social media post',
						description: 'Transcribe a social media post',
						routing: {
							request: {
								method: 'POST',
								url: '/transcribe',
							},
						},
					},
				],
				default: 'analyze',
			},

			// Analyze Request
			{
				displayName: 'Post URL',
				description: 'The URL of the post to transcribe or analyze',
				required: true,
				name: 'postURL',
				type: 'string',
				routing: {
					request: {
						body: {
							post_url: '={{ $value }}',
						},
					},
				},
				default: '',
				displayOptions: {
					show: {
						resource: [
							'socialMediaVideo',
						],
						operation: [
							'analyze',
							'transcribe',
						],
					},
				},
			},


			// Optional/additional fields will go here
			{
				displayName: 'Callback URL',
				description: 'The URL to call back to',
				name: 'callbackURL',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'socialMediaVideo',
						],
						operation: [
							'transcribe',
							'analyze',
						],
					},
				},
				routing: {
					request: {
						body: {
							callback_url: '={{ isEmpty($value) ? null : $value }}',
						},
					},
				},
			},
			{
				displayName: 'Query',
				description: 'The question to ask the video',
				name: 'query',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'socialMediaVideo',
						],
						operation: [
							'analyze',
						],
					}
				},
				routing: {
					request: {
						body: {
							query: '={{ isEmpty($value) ? null : $value }}',
						},
					},
				},
			},
			{
				displayName: 'Include Metadata',
				description: 'Whether to include post metadata (# of likes, views, etc.) in the response',
				name: 'includeMetadata',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [
							'socialMediaVideo',
						],
						operation: [
							'analyze',
							'transcribe',
						],
					}
				},
				routing: {
					request: {
						qs: {
							includeMetadata: '={{ $value }}',
						},
					},
				},
			},
		]
	};
}
