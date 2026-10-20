---
name: ai-wardrobe
description: Use when implementing or modifying AI clothing-image analysis, clothing attribute extraction, or outfit recommendations based on a user's wardrobe.
---

# Clothset AI Wardrobe Skill

## 1. Core Principles

- AI should help users organize clothing and discover useful outfit combinations from items they already own.
- Treat AI output as potentially incorrect.
- Never present unsupported inferences as verified facts.
- Preserve user control over wardrobe data.
- Follow all project-wide privacy, authorization, and subscription rules.

## 2. Clothing Image Analysis

- Analyze only images the authenticated user is authorized to access.
- Validate image uploads according to the application's existing file type, size, and access rules.
- Use image analysis to identify relevant clothing attributes, such as garment type, color, pattern, material, or style, when supported by the image.
- Do not claim an attribute is certain when the image is ambiguous or does not support the conclusion.
- Represent unknown or uncertain attributes honestly using the existing data model.
- Never invent fallback facts to fill missing analysis results.
- Validate AI-generated output against the expected schema before using it.
- Distinguish AI-suggested attributes from user-confirmed information.
- Follow the existing confirmation and persistence behavior before saving AI results.
- Never silently overwrite user-edited clothing information with new AI analysis.
- Handle unclear images, malformed responses, provider errors, timeouts, and rate limits gracefully.

## 3. Outfit Recommendations

- Generate recommendations from the user's actual, accessible wardrobe records and relevant preferences.
- Verify that every recommended clothing item belongs to the user's wardrobe before presenting it.
- Never fabricate wardrobe items to complete an outfit.
- Use clothing attributes only to the extent supported by available data.
- Respect relevant user preferences when they are available.
- Explain recommendations in concise, useful language when an explanation improves the experience.
- If the wardrobe lacks suitable items or sufficient information, communicate the limitation rather than inventing a confident recommendation.
- Do not claim an outfit is suitable for a particular event, weather condition, or dress code unless sufficient relevant information is available.
- Do not represent subjective style suggestions as objective facts.

## 4. Backend and Reliability

- Keep AI credentials and privileged provider calls on the server.
- Follow the existing AI provider integration and application architecture.
- Do not assume a specific AI model or provider when the project has not established one.
- Validate inputs before sending them to an AI provider.
- Validate structured outputs before passing them into application logic or persistence.
- Send only information necessary for the AI task.
- Avoid repeated or unnecessary AI calls when existing results or deterministic logic are sufficient.
- Respect existing rate limits, usage limits, and free/premium entitlements.
- Handle retries carefully to avoid duplicate processing and unnecessary costs.
- Do not expose credentials, internal prompts, raw provider errors, or sensitive user data to clients.
- Keep provider-specific logic isolated where appropriate for the existing architecture.
- Ensure AI operations respect authentication, resource ownership, and data privacy.

## 5. Error Handling

- Handle unavailable AI services without breaking unrelated wardrobe features.
- Communicate analysis failures in clear, user-friendly language.
- Do not display malformed or unvalidated AI output as valid clothing information.
- Do not report an analysis or recommendation as successful if it failed.
- Preserve existing user data when analysis fails.
- Avoid silently retrying indefinitely or creating unexpected costs.

## 6. Testing

- Test malformed, incomplete, ambiguous, and unexpected AI responses.
- Test that recommendations reference only items the user owns and can access.
- Test that manual clothing edits are not silently overwritten.
- Test provider failures, timeouts, and rate limits.
- Test that authentication, ownership, and free/premium limits apply to AI operations.
- Do not claim AI output is accurate or verified without an actual validation mechanism.
