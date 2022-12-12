export type ActionReference = {
  owner: string;
  name: string;
  ref: string;
  path?: string;
};

// https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsuses
export function parseActionReference(uses: string): ActionReference | undefined {
  if (!uses || uses.startsWith("docker://") || uses.startsWith("./") || uses.startsWith(".\\")) {
    return undefined;
  }

  const [action, ref] = uses.split("@");
  const [owner, name, ...pathSegments] = action.split(/[\\/]/).filter(s => s.length > 0);
  if (!owner || !name) {
    return undefined;
  }

  if (pathSegments.length === 0) {
    return {
      owner,
      name,
      ref
    };
  }

  return {
    owner,
    name,
    ref,
    path: pathSegments.join("/")
  };
}

export function actionIdentifier(ref: ActionReference): string {
  if (ref.path) {
    return `${ref.owner}/${ref.name}/${ref.ref}/${ref.path}`;
  }
  return `${ref.owner}/${ref.name}/${ref.ref}`;
}
