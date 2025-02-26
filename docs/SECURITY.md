# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please follow the steps below to responsibly disclose it:

1. **Do not open an issue or pull request directly on GitHub**. This avoids making the vulnerability public and potentially exploitable by malicious actors.
2. **Send an email to our security team** at [security@sugarlabs.org](mailto:security@sugarlabs.org) with the following details:
   - A description of the vulnerability and its impact.
   - Detailed steps to reproduce the vulnerability, including any relevant code snippets, configuration details, or screenshots.
   - Any potential mitigations or fixes you have identified.

Our security team will acknowledge receipt of your report within 48 hours and will work with you to understand and address the issue. We aim to resolve critical vulnerabilities as quickly as possible and will provide updates on the status of the fix.

## Supported Versions

We only support the latest version of the project for security updates. Please ensure you are using the most recent release to benefit from the latest security enhancements.

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Security Best Practices

To help ensure the security of your contributions and the overall project, please follow these best practices:

1. **Stay Informed**: Keep up-to-date with the latest security advisories and updates related to the technologies used in this project, such as TypeScript, React, Node.js, and npm.
2. **Use Strong Authentication**: Enable two-factor authentication (2FA) on your GitHub account to protect your contributions and maintain the integrity of the project.
3. **Review Dependencies**: Regularly review and update project dependencies to ensure they are free from known vulnerabilities. Use tools like `npm audit` to identify and address security issues in dependencies.
4. **Follow Secure Coding Guidelines**: Adhere to secure coding practices, such as validating input, sanitizing output, and avoiding the use of unsafe functions. Refer to resources like the [OWASP Top Ten](https://owasp.org/www-project-top-ten/) for guidance.
5. **Report Suspicious Activity**: If you notice any suspicious activity or potential security issues within the project or its dependencies, report it immediately to the security team.

## Handling Sensitive Information

Avoid including sensitive information, such as passwords, API keys, or personal data, in your code contributions or public discussions. If sensitive information is accidentally exposed, notify the security team immediately to mitigate any potential impact.

## Code Quality and Security

To maintain a high level of security and code quality, please adhere to the following guidelines when contributing to the project:

1. **Conduct Code Reviews**: All pull requests must be reviewed by at least one other contributor before being merged. Reviewers should pay close attention to potential security issues and ensure that the code follows best practices.
2. **Write Unit Tests**: Include unit tests for any new functionality or changes to existing code to ensure that the code behaves as expected and does not introduce security vulnerabilities.
3. **Use Linting Tools**: Run linting tools, such as ESLint, to identify and address potential security issues and code quality problems.
4. **Continuous Integration**: Ensure that all tests pass and that the code meets the project's quality standards before merging pull requests. Use continuous integration tools, such as GitHub Actions, to automate these checks.

Thank you for helping us maintain the security and integrity of our project!
