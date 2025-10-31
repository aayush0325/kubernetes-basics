'use client';

import { useState } from 'react';

export default function Home() {
	const [statusValue, setStatusValue] = useState('');
	const [currentStatus, setCurrentStatus] = useState<string | null>(null);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const backendUrl = "https://kubebackend.aayush0325.fun";

	const handleSetStatus = async () => {
		if (!statusValue.trim()) {
			setMessage('Please enter a status value');
			return;
		}

		setLoading(true);
		setMessage('');

		try {
			const response = await fetch(`${backendUrl}/set/${encodeURIComponent(statusValue)}`);
			const data = await response.json();

			if (response.ok) {
				setMessage(`✓ ${data.msg}`);
				setStatusValue('');
			} else {
				setMessage(`✗ Error: ${data.error || 'Failed to set status'}`);
			}
		} catch (error) {
			setMessage(`✗ Error: ${error instanceof Error ? error.message : 'Failed to connect to backend'}`);
		} finally {
			setLoading(false);
		}
	};

	const handleGetStatus = async () => {
		setLoading(true);
		setMessage('');
		setCurrentStatus(null);

		try {
			const response = await fetch(`${backendUrl}/get/status`);
			const data = await response.json();

			if (response.ok) {
				setCurrentStatus(data.value);
				setMessage('✓ Status retrieved successfully');
			} else {
				setMessage(`✗ Error: ${data.error || 'Failed to get status'}`);
			}
		} catch (error) {
			setMessage(`✗ Error: ${error instanceof Error ? error.message : 'Failed to connect to backend'}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Redis Status Manager
					</h1>
					<p className="text-lg text-gray-600">
						Set and retrieve status values from Redis
					</p>
				</div>

				<div className="bg-white rounded-lg shadow-xl p-8 mb-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6">
						Set Status
					</h2>

					<div className="flex gap-4 mb-4">
						<input
							type="text"
							value={statusValue}
							onChange={(e) => setStatusValue(e.target.value)}
							placeholder="Enter status value (e.g., WORKING, IDLE, BUSY)"
							className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900"
							onKeyPress={(e) => e.key === 'Enter' && handleSetStatus()}
							disabled={loading}
						/>
						<button
							onClick={handleSetStatus}
							disabled={loading}
							className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{loading ? 'Setting...' : 'Set Status'}
						</button>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-xl p-8 mb-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6">
						Get Current Status
					</h2>

					<button
						onClick={handleGetStatus}
						disabled={loading}
						className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{loading ? 'Fetching...' : 'Get Status'}
					</button>

					{currentStatus !== null && (
						<div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
							<p className="text-sm font-medium text-green-800 mb-1">Current Status:</p>
							<p className="text-2xl font-bold text-green-900">{currentStatus}</p>
						</div>
					)}
				</div>

				{message && (
					<div className={`rounded-lg p-4 ${message.startsWith('✓')
						? 'bg-green-50 border border-green-200 text-green-800'
						: 'bg-red-50 border border-red-200 text-red-800'
						}`}>
						<p className="font-medium">{message}</p>
					</div>
				)}

				<div className="mt-8 text-center text-sm text-gray-500">
					<p>Backend URL: <span className="font-mono">{backendUrl}</span></p>
				</div>
			</div>
		</div>
	);
}
