# Anvaya CRM 📈

## A Lead Management & Sales Tracking System

### Description

Anvaya CRM is a focused and efficient Customer Relationship Management system designed to help sales teams track leads, manage agents, and monitor sales performance in a structured and intuitive way.
The platform centers around lead lifecycle management, allowing teams to create leads, assign sales agents, track status changes, add time-stamped comments, and analyze progress through visual reports. With powerful filtering, sorting, and reporting features, Anvaya CRM enables better decision-making and improved sales workflows.

## Technologies Used

- ⚛️ Frontend – Modern component-based UI
- 🌐 Backend – RESTful APIs
- 🍃 MongoDB – Data storage for leads, agents, comments, and reports
- 🚀 Express.js – API routing and request handling
- 🟢 Node.js – Backend runtime
- 📊 Charts & Reports – Data visualization for lead analytics

## Live Demo

🌐 **Deployed URL:** https://anvaya-crm-three.vercel.app/

## Features

### 📊 Dashboard Overview

- View leads categorized by status (New, Contacted, Qualified, etc.)

- Quick filters for instant lead segmentation

- Fast access to add new leads

### 🧾 Lead Management

- Create, update, view, and delete leads

- Assign sales agents to leads

- Track priority, source, status, and time to close

### 💬 Comment System 

- Add time-stamped comments to each lead

- Track conversation history with author details

- Maintain complete lead context in one place

### 📋 Lead List & Views

- Filter leads by status, sales agent, source, and priority

- Sort leads by priority or time to close

- Dedicated views by lead status and sales agent

### 👥 Sales Agent Management

- Add and manage sales agents

- Assign agents to leads

- View agent-wise lead distribution

### 📈 Reports & Analytics

- Leads closed in the last week

- Total leads currently in pipeline

- Lead status distribution

- Agent-wise performance tracking

### 📱 Clean & Scalable UI

- Sidebar-based navigation

- Simple, structured screens for productivity

- Designed for sales teams and managers

## API Reference
#### Leads API

POST /leads
Create a new lead

GET /leads
Fetch all leads with optional filters

PUT /leads/:id
Update lead details

DELETE /leads/:id
Delete a lead

#### Sales Agents API

POST /agents
Create a new sales agent

GET /agents
Fetch all sales agents

Comments API (Super Feature)

POST /leads/:id/comments
Add a comment to a lead

GET /leads/:id/comments
Fetch all comments for a lead

#### Reporting API

GET /report/last-week
Get leads closed in the last 7 days

GET /report/pipeline
Get total leads currently in pipeline

## Contact
For Bugs or feature request please reach out to suryanshshukla859@gmail.com
