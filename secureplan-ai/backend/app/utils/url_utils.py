from urllib.parse import urljoin, urlparse


def same_origin(base_url: str, candidate_url: str) -> bool:
    base = urlparse(base_url)
    candidate = urlparse(candidate_url)
    return base.scheme == candidate.scheme and base.netloc == candidate.netloc


def normalize_url(base_url: str, href: str | None) -> str | None:
    if not href:
        return None
    if href.startswith(("mailto:", "tel:", "javascript:", "#")):
        return None
    absolute = urljoin(base_url, href)
    parsed = urlparse(absolute)
    if not parsed.scheme.startswith("http"):
        return None
    return parsed._replace(fragment="").geturl()

