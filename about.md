---
layout: page
title: About
permalink: /about/
---

### Description

Hello World! We are RatGooseSuit Studios.
This website features our newest game, Travelling with Taste!

### Team

{% for profile in site.data.authors %}
{% include profile.html %}
{% endfor %}
