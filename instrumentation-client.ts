// instrumentation-client.ts
import posthog from 'posthog-js'

export function register() {
    if (typeof window !== 'undefined') {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            person_profiles: 'identified_only', // Recommended for newer PostHog versions
        })
    }
}