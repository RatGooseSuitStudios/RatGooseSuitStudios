---
layout: page
title: Team
permalink: /team/
---

{% for profile in site.data.authors %}
{% include profile.html %}
{% endfor %}
