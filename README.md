# Advanced Data Fetching with Next.js App Router

### Static, Dynamic, and Hybrid Rendering

## Overview

This project demonstrates how **Next.js App Router** supports different data-fetching and rendering strategies — **Static Rendering (SSG)**, **Dynamic Rendering (SSR)**, and **Hybrid Rendering (ISR)** — and how choosing the right strategy impacts **performance, scalability, cost, and data freshness**.

The goal is not just to implement these modes, but to understand **when and why** each should be used in a real-world application.

---

## Rendering Strategies Used in This App

### Pages and Rendering Modes

| Route        | Rendering Mode          | Description                                            |
| ------------ | ----------------------- | ------------------------------------------------------ |
| `/about`     | Static Rendering (SSG)  | Generated at build time and served as static HTML      |
| `/dashboard` | Dynamic Rendering (SSR) | Rendered on every request with no caching              |
| `/news`      | Hybrid Rendering (ISR)  | Static page regenerated periodically in the background |

Each page is intentionally designed to represent a real-world use case.

---

## Why Each Rendering Approach Was Chosen

### Static Rendering (SSG) — `/about`

The **About** page uses Static Site Generation because its content is informational and does not change frequently.

* The page is generated **once at build time**
* Served directly from a CDN
* No server computation during user requests

**Benefits**

* Extremely fast load times
* Excellent scalability
* Lowest hosting cost

This makes SSG ideal for marketing pages, documentation, and content that rarely changes.

---

### Dynamic Rendering (SSR) — `/dashboard`

The **Dashboard** page uses Server-Side Rendering because it represents data that must always be fresh.

* The page is rendered **on every request**
* Fetching uses `cache: 'no-store'`
* Rendering is forced with `dynamic = 'force-dynamic'`

**Benefits**

* Always up-to-date data
* Suitable for real-time or user-specific information

**Trade-offs**

* Slower than static pages
* Increased server load
* Higher hosting costs at scale

SSR is best suited for dashboards, analytics, and authenticated pages where freshness is critical.

---

### Hybrid Rendering (ISR) — `/news`

The **News** page uses Incremental Static Regeneration to balance performance and freshness.

* Served as static HTML
* Automatically regenerated in the background using `revalidate`
* Users never wait for regeneration

**Benefits**

* Near-static performance
* Much better scalability than SSR
* Content stays reasonably fresh

ISR is ideal for news feeds, product listings, and event pages where data changes often but not every second.

---

## Caching, Revalidation, and Performance Impact

Choosing a rendering strategy directly affects performance and scalability:

* **Static Rendering (SSG)**
  Content is cached permanently at build time, resulting in the fastest response times and minimal server usage.

* **Dynamic Rendering (SSR)**
  Content is rendered on every request, ensuring freshness but increasing server cost and reducing scalability.

* **Hybrid Rendering (ISR)**
  Combines static performance with scheduled background updates, significantly reducing server load while keeping content fresh.

This trade-off can be visualized as a triangle:

**Speed ↔ Freshness ↔ Scalability**
Each rendering mode optimizes two of these at the expense of the third.

---

## Case Study: “The News Portal That Felt Outdated”

### Problem Scenario

At *DailyEdge*, the homepage was statically generated for speed, but users complained that the **Breaking News** section showed outdated headlines.

Switching the entire site to SSR fixed freshness issues but caused:

* Slower page loads
* Increased server usage
* Higher hosting costs

### Analysis

The issue occurred because a **single rendering strategy was applied everywhere**, instead of choosing strategies based on content needs.

### Balanced Solution Using Next.js App Router

| Page Section      | Recommended Strategy | Reason                            |
| ----------------- | -------------------- | --------------------------------- |
| Homepage layout   | Static (SSG)         | Fast load times                   |
| Breaking News     | Hybrid (ISR)         | Frequent updates without SSR cost |
| User dashboards   | Dynamic (SSR)        | Real-time accuracy                |
| Archived articles | Static (SSG)         | No freshness requirement          |

Using `revalidate` for news content allows updates without sacrificing performance, while SSR is reserved only for pages that truly need it.

---

## Proof of Rendering Behavior

Screenshots and logs are included to verify the rendering behavior.

### Dynamic Rendering (SSR) — `/dashboard`

* Terminal logs show new timestamps on every refresh
* Network tab confirms data is fetched on each request

![SSR Logs](./screenshots/dashboard-ssr-logs.png)
![Network Requests](./screenshots/dashboard-network.png)

---

### Hybrid Rendering (ISR) — `/news`

* Page regenerates after the revalidation interval
* Logs show background regeneration without blocking users

![ISR Logs](./screenshots/news-isr-log.png)

---

### Static Rendering (SSG) — `/about`

* Page generated during build
* No runtime server execution

![SSG Build Output](./screenshots/about-ssg-build.png)

---

## Reflection: Scaling to More Users

If application traffic increased by 10×:

* Using SSR everywhere would significantly increase server cost and response time
* Static rendering and ISR would allow most traffic to be served from the CDN
* SSR should be limited to pages that require real-time or personalized data

In production systems, **choosing the right rendering strategy is a performance and cost decision**, not just a technical one.

---

## Repository & Submission Links

* **GitHub Pull Request:** *(add your PR link here)*
* **Video Explanation:** *(add your Google Drive link here)*

---

### Final Note

This project demonstrates how thoughtful use of Next.js App Router data-fetching strategies can dramatically improve **performance, scalability, and user experience** when applied correctly.

---

## 2.4

## Environment-Aware Builds & Secrets Management

Environment segregation is essential because development, staging, and production environments serve different purposes and have different risk levels. In this project, separate configuration files (`.env.development`, `.env.staging`, and `.env.production`) are used so that each environment connects to the correct APIs and services. This prevents test or staging configurations from accidentally being used in production.

Secure secret management improves the safety and reliability of CI/CD pipelines by ensuring sensitive information such as API keys and database URLs are never hardcoded or committed to the repository. Secrets are handled using environment variables and are injected during build or deployment, allowing environment-specific access and safe secret rotation.

### Case Study: The Staging Secret That Broke Production

In the ShopLite scenario, the issue occurred because staging database credentials were mistakenly used in the production environment, which led to live data being overwritten. This situation could have been avoided by enforcing strict environment segregation and storing production secrets securely using tools like GitHub Secrets or cloud key management services.

In this project, environment-aware builds ensure that each deployment loads the correct environment configuration, and secrets are isolated per environment. This approach prevents cross-environment mistakes, protects production data, and improves overall deployment reliability.

---

## Docker, CI/CD, and Secure Cloud Deployments

Docker simplifies deployment by packaging the application, its dependencies,
and runtime configuration into a single container. In this project, Docker
ensured that the application behaved the same locally and inside CI pipelines,
removing “it works on my machine” issues.

CI/CD pipelines further simplify deployments by automating the build process.
Using GitHub Actions, every code push automatically builds the Docker image,
which reduces manual errors and ensures broken builds are detected early.

When deploying a full-stack application securely to AWS or Azure, it is critical
to manage environment variables and secrets properly. Sensitive values should
never be hardcoded in images or repositories and must be injected at runtime
using environment variables or secret managers.

### Case Study: The Never-Ending Deployment Loop

In the QuickServe scenario, deployments failed due to missing environment
variables, port conflicts, and old containers continuing to run in production.
These issues occur when container lifecycle management and pipeline handoffs
are not clearly defined.

This can be fixed by ensuring each CI/CD stage cleanly hands off to the next:

---

## PostgreSQL Schema Design

### Core Entities
- **User**: Represents a registered user.
- **Project**: Represents a project owned by a user.
- **Task**: Represents tasks under a project.

### Relationships
- One User → Many Projects
- One Project → Many Tasks

### Keys & Constraints
- Primary keys on all tables
- Foreign keys with `ON DELETE CASCADE`
- Unique constraint on user email
- ENUM-based task status
- Indexed foreign keys for performance

### Normalization
- **1NF**: All fields contain atomic values
- **2NF**: No partial dependency on composite keys
- **3NF**: No transitive dependency between non-key attributes

### Migration & Setup Notes
Due to IPv4 network restrictions blocking direct PostgreSQL access (port 5432),
Prisma migrations could not be executed.

The schema was applied directly using SQL in Supabase, which still creates
the same PostgreSQL tables, constraints, and relationships.
Verification was done via Supabase Schema Visualizer.

---

## Transaction & Query Optimisation

### Transactions
Prisma `$transaction()` was used to ensure atomic creation of related records.
If any operation fails, all changes are rolled back automatically.

### Rollback Verification
Rollback behavior was verified by intentionally triggering an error inside a
transaction and confirming that no partial data was written.

### Indexes Added
Indexes were added on:
- User.email
- Project.userId
- Task.projectId
- Task.status

These reduce lookup time and avoid full table scans.

### Query Optimisation
- Avoided over-fetching using `select`
- Used pagination with `skip` and `take`
- Prevented N+1 query patterns

### Reflection
With increased scale, indexed queries and transactional writes ensure data
integrity, faster reads, and predictable performance under load.

---

## Global API Response Handler

To ensure consistent and predictable API responses, a global response handler
was implemented across all API routes.

### Unified Response Format

All API responses follow this structure:

#### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "timestamp": "2026-01-19T10:00:00Z"
}



